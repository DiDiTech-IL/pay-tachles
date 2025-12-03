import { NextRequest, NextResponse } from "next/server";
import { Effect } from "effect";
import { DbService, DbServiceLive } from "@/services";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = DbServiceLive;

// =============================================================================
// GET /api/transactions - List all transactions
// =============================================================================

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const appId = searchParams.get("appId") || undefined;
  const status = searchParams.get("status") || undefined;
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.listTransactions({
      app_id: appId,
      status,
      limit,
      offset,
    });
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return NextResponse.json(
      { error: "Failed to list transactions" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    transactions: result.right.map((txn) => ({
      id: txn.id,
      appId: txn.app_id,
      payupId: txn.payup_id,
      externalId: txn.external_id,
      amount: txn.amount,
      currency: txn.currency,
      status: txn.status,
      customerEmail: txn.customer_email,
      customerName: txn.customer_name,
      customerId: txn.customer_id,
      description: txn.description,
      metadata: txn.metadata,
      failureReason: txn.failure_reason,
      fees: txn.fees,
      netAmount: txn.net_amount,
      createdAt: txn.created_at.toISOString(),
      updatedAt: txn.updated_at.toISOString(),
    })),
  });
}
