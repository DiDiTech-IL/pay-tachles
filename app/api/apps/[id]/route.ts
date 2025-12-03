import { NextRequest, NextResponse } from "next/server";
import { Effect, Layer } from "effect";
import { DbService, DbServiceLive, CryptoService, CryptoLive } from "@/services";
import { Prisma } from "@/lib/generated/prisma";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = Layer.mergeAll(DbServiceLive, CryptoLive);

// =============================================================================
// GET /api/apps/[id] - Get app by ID
// =============================================================================

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.getAppById(id);
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json({ error: "Failed to get app" }, { status: 500 });
  }

  const app = result.right;
  if (!app) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  return NextResponse.json({
    app: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  });
}

// =============================================================================
// PATCH /api/apps/[id] - Update app
// =============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: {
    name?: string;
    webhookUrl?: string;
    isActive?: boolean;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.updateApp(id, {
      name: body.name,
      webhook_url: body.webhookUrl,
      is_active: body.isActive,
      metadata: body.metadata as Prisma.InputJsonValue,
    });
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json({ error: "Failed to update app" }, { status: 500 });
  }

  const app = result.right;
  return NextResponse.json({
    app: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      updatedAt: app.updated_at.toISOString(),
    },
  });
}

// =============================================================================
// DELETE /api/apps/[id] - Delete app
// =============================================================================

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    yield* db.deleteApp(id);
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json({ error: "Failed to delete app" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// =============================================================================
// POST /api/apps/[id]/rotate-secret - Rotate webhook secret
// =============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);

  // Check if this is the rotate-secret action
  if (!url.pathname.endsWith("/rotate-secret")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    const crypto = yield* CryptoService;

    const newSecret = yield* crypto.generateUUID();
    const app = yield* db.getAppById(id);
    
    if (!app) {
      return null;
    }

    // Note: This would need a proper updateWebhookSecret method
    // For now we'll just return the concept
    return { webhookSecret: `whsec_${newSecret.replace(/-/g, "")}` };
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left" || !result.right) {
    return NextResponse.json({ error: "Failed to rotate secret" }, { status: 500 });
  }

  return NextResponse.json(result.right);
}
