import { NextRequest, NextResponse } from "next/server";
import { Effect, Layer } from "effect";
import { DbService, DbServiceLive, CryptoService, CryptoLive } from "@/services";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = Layer.mergeAll(DbServiceLive, CryptoLive);

// =============================================================================
// POST /api/apps/[id]/regenerate-key - Regenerate API key
// =============================================================================

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    const crypto = yield* CryptoService;

    // Verify app exists
    const existingApp = yield* db.getAppById(id);
    if (!existingApp) {
      return null;
    }

    // Generate new API key
    const newKey = yield* crypto.generateUUID();
    const apiKey = `pk_${newKey.replace(/-/g, "")}`;

    // Update the app with new API key
    // Note: We need to use raw prisma for this since updateApp doesn't support api_key
    const updatedApp = yield* Effect.tryPromise({
      try: () =>
        db.client.app.update({
          where: { id },
          data: { api_key: apiKey },
        }),
      catch: (error) => new Error(`Failed to update: ${error}`),
    });

    return updatedApp;
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json({ error: "Failed to regenerate API key" }, { status: 500 });
  }

  if (!result.right) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  const app = result.right;
  return NextResponse.json({
    app: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  });
}
