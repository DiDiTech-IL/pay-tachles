// =============================================================================
// Example: Node.js Server with Tachles Core
// =============================================================================

import { Effect } from "effect";
import {
  startServer,
  Database,
} from "@tachles/core/adapters/node";

// =============================================================================
// Types for Request Bodies
// =============================================================================

interface CreateAppBody {
  name: string;
  provider?: string;
  apiKey?: string;
  webhookSecret?: string;
  webhookUrl?: string;
}

interface CreatePayupBody {
  appId: string;
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
  expiresInMinutes?: number;
}

// =============================================================================
// Request Handler
// =============================================================================

const handler = (request: Request) =>
  Effect.gen(function* () {
    const url = new URL(request.url);
    const db = yield* Database;

    // Health check
    if (url.pathname === "/health") {
      return new Response(
        JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // List apps
    if (url.pathname === "/api/apps" && request.method === "GET") {
      const apps = yield* db.listApps();
      return new Response(JSON.stringify(apps), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create app
    if (url.pathname === "/api/apps" && request.method === "POST") {
      const body = (yield* Effect.promise(() => request.json())) as CreateAppBody;
      const app = yield* db.createApp({
        name: body.name,
        provider: body.provider || "stripe",
        apiKey: body.apiKey || `sk_test_${crypto.randomUUID()}`,
        webhookSecret: body.webhookSecret || `whsec_${crypto.randomUUID()}`,
        webhookUrl: body.webhookUrl || "",
      });
      return new Response(JSON.stringify(app), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    // List payups
    if (url.pathname === "/api/payups" && request.method === "GET") {
      const appId = url.searchParams.get("appId");
      const payups = yield* db.listPayups(appId ? { appId } : undefined);
      return new Response(JSON.stringify(payups), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create payup
    if (url.pathname === "/api/payups" && request.method === "POST") {
      const body = (yield* Effect.promise(() => request.json())) as CreatePayupBody;
      const payup = yield* db.createPayup({
        appId: body.appId,
        amount: body.amount,
        currency: body.currency || "USD",
        customerEmail: body.customerEmail,
        customerName: body.customerName,
        description: body.description,
        returnUrl: body.returnUrl,
        cancelUrl: body.cancelUrl,
        expiresAt: new Date(Date.now() + (body.expiresInMinutes || 60) * 60 * 1000),
      });
      return new Response(JSON.stringify(payup), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 404
    return new Response(
      JSON.stringify({ error: "Not Found", path: url.pathname }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }).pipe(Effect.catchAll((error) =>
    Effect.succeed(
      new Response(
        JSON.stringify({ error: String(error) }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    )
  ));

// =============================================================================
// Start Server
// =============================================================================

const PORT = parseInt(process.env.PORT || "3000");

startServer({
  port: PORT,
  handler,
}).then(({ url }) => {
  console.log(`🚀 Tachles server running at ${url}`);
  console.log(`   Health: ${url}/health`);
  console.log(`   Apps:   ${url}/api/apps`);
  console.log(`   Payups: ${url}/api/payups`);
});
