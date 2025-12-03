import { NextRequest, NextResponse } from "next/server";
import { Effect, Layer } from "effect";
import { DbService, DbServiceLive, CryptoService, CryptoLive } from "@/services";
import { Prisma } from "@/lib/generated/prisma";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = Layer.mergeAll(DbServiceLive, CryptoLive);

// =============================================================================
// GET /api/apps - List all apps
// =============================================================================

export async function GET() {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.listApps();
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json(
      { error: "Failed to list apps" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    apps: result.right.map((app) => ({
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      createdAt: app.created_at.toISOString(),
    })),
  });
}

// =============================================================================
// POST /api/apps - Create new app
// =============================================================================

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    provider?: string;
    webhookUrl?: string;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name || !body.provider || !body.webhookUrl) {
    return NextResponse.json(
      { error: "name, provider, and webhookUrl are required" },
      { status: 400 }
    );
  }

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    const crypto = yield* CryptoService;

    const apiKey = yield* crypto.generateUUID();
    const webhookSecret = yield* crypto.generateUUID();

    return yield* db.createApp({
      name: body.name!,
      provider: body.provider!,
      api_key: `pk_${apiKey.replace(/-/g, "")}`,
      webhook_secret: `whsec_${webhookSecret.replace(/-/g, "")}`,
      webhook_url: body.webhookUrl!,
      metadata: body.metadata as Prisma.InputJsonValue,
    });
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json(
      { error: "Failed to create app" },
      { status: 500 }
    );
  }

  const app = result.right;
  return NextResponse.json(
    {
      app: {
        id: app.id,
        name: app.name,
        provider: app.provider,
        apiKey: app.api_key,
        webhookSecret: app.webhook_secret,
        webhookUrl: app.webhook_url,
        isActive: app.is_active,
        createdAt: app.created_at.toISOString(),
      },
    },
    { status: 201 }
  );
}
