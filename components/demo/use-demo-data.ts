"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================================
// Types
// ============================================================================

export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded";

export interface DemoPayment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerEmail: string;
  customerName: string;
  description: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  processingTime?: number; // ms
}

export interface DemoWebhookEvent {
  id: string;
  paymentId: string;
  type: string;
  status: PaymentStatus;
  timestamp: Date;
  data: Record<string, unknown>;
}

export interface DemoStats {
  totalRevenue: number;
  totalTransactions: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
  processingCount: number;
  refundedCount: number;
  successRate: number;
  avgProcessingTime: number;
  revenueByHour: { hour: string; amount: number; count: number }[];
  statusBreakdown: { status: PaymentStatus; count: number; percentage: number }[];
}

// ============================================================================
// Demo Data Generation
// ============================================================================

const CUSTOMERS = [
  { name: "John Smith", email: "john.smith@example.com" },
  { name: "Sarah Johnson", email: "sarah.j@company.co" },
  { name: "Michael Chen", email: "m.chen@startup.io" },
  { name: "Emily Davis", email: "emily.d@corp.com" },
  { name: "David Wilson", email: "dwilson@enterprise.net" },
  { name: "Lisa Anderson", email: "lisa.a@business.org" },
  { name: "James Brown", email: "jbrown@tech.co" },
  { name: "Maria Garcia", email: "mgarcia@retail.com" },
  { name: "Robert Taylor", email: "rtaylor@services.io" },
  { name: "Jennifer Martinez", email: "jmartinez@store.net" },
];

const DESCRIPTIONS = [
  "Pro Plan - Monthly",
  "Enterprise License",
  "API Credits Bundle",
  "Premium Support",
  "Team Subscription",
  "Storage Upgrade",
  "Custom Integration",
  "Annual Subscription",
  "Starter Pack",
  "Growth Plan",
];

const PROVIDERS = ["stripe", "paypal", "square", "adyen"];

// Webhook event types supported by the system
export type WebhookEventType =
  | "payment.created"
  | "payment.processing"
  | "payment.completed"
  | "payment.failed"
  | "payment.refunded"
  | "customer.updated"
  | "invoice.sent";

function randomId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(): number {
  // Generate amounts between $5 and $500 in cents
  const amounts = [499, 999, 1999, 2999, 4999, 9999, 14999, 19999, 29999, 49999];
  return randomChoice(amounts);
}

function generatePayment(status?: PaymentStatus): DemoPayment {
  const customer = randomChoice(CUSTOMERS);
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.random() * 3600000); // Within last hour
  
  const finalStatus = status || randomChoice<PaymentStatus>(["pending", "processing", "completed", "completed", "completed", "failed"]);
  
  return {
    id: randomId("pay"),
    amount: randomAmount(),
    currency: "USD",
    status: finalStatus,
    customerEmail: customer.email,
    customerName: customer.name,
    description: randomChoice(DESCRIPTIONS),
    provider: randomChoice(PROVIDERS),
    createdAt,
    updatedAt: now,
    processingTime: finalStatus === "completed" ? 1500 + Math.random() * 3000 : undefined,
  };
}

function generateWebhookEvent(payment: DemoPayment): DemoWebhookEvent {
  return {
    id: randomId("evt"),
    paymentId: payment.id,
    type: `payment.${payment.status}`,
    status: payment.status,
    timestamp: new Date(),
    data: {
      amount: payment.amount,
      currency: payment.currency,
      customer: payment.customerEmail,
    },
  };
}

// ============================================================================
// Main Hook
// ============================================================================

interface UseDemoDataOptions {
  /** Initial number of payments to generate */
  initialCount?: number;
  /** Interval (ms) between new payment events */
  eventInterval?: number;
  /** Whether to auto-simulate events */
  autoSimulate?: boolean;
}

export function useDemoData(options: UseDemoDataOptions = {}) {
  const {
    initialCount = 25,
    eventInterval = 3000,
    autoSimulate = true,
  } = options;

  const [payments, setPayments] = useState<DemoPayment[]>([]);
  const [webhookEvents, setWebhookEvents] = useState<DemoWebhookEvent[]>([]);
  const [isSimulating, setIsSimulating] = useState(autoSimulate);
  const [lastEvent, setLastEvent] = useState<DemoWebhookEvent | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  // Initialize with some data (only on mount)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    const initialPayments: DemoPayment[] = [];
    const initialEvents: DemoWebhookEvent[] = [];

    for (let i = 0; i < initialCount; i++) {
      const payment = generatePayment();
      // Backdate payments
      payment.createdAt = new Date(Date.now() - (initialCount - i) * 120000);
      payment.updatedAt = new Date(payment.createdAt.getTime() + Math.random() * 60000);
      initialPayments.push(payment);
      initialEvents.push(generateWebhookEvent(payment));
    }

    setPayments(initialPayments);
    setWebhookEvents(initialEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate new events
  const simulateEvent = useCallback(() => {
    const eventType = Math.random();
    
    if (eventType < 0.6) {
      // 60% chance: new payment
      const newPayment = generatePayment("pending");
      const event = generateWebhookEvent(newPayment);
      
      setPayments(prev => [newPayment, ...prev].slice(0, 100));
      setWebhookEvents(prev => [event, ...prev].slice(0, 50));
      setLastEvent(event);

      // Simulate status progression
      setTimeout(() => {
        setPayments(prev => prev.map(p => 
          p.id === newPayment.id ? { ...p, status: "processing" as PaymentStatus, updatedAt: new Date() } : p
        ));
        const processingEvent = { ...event, id: randomId("evt"), type: "payment.processing", status: "processing" as PaymentStatus, timestamp: new Date() };
        setWebhookEvents(prev => [processingEvent, ...prev].slice(0, 50));
        setLastEvent(processingEvent);
      }, 1000 + Math.random() * 2000);

      setTimeout(() => {
        const finalStatus: PaymentStatus = Math.random() > 0.15 ? "completed" : "failed";
        setPayments(prev => prev.map(p => 
          p.id === newPayment.id ? { 
            ...p, 
            status: finalStatus, 
            updatedAt: new Date(),
            processingTime: finalStatus === "completed" ? 2000 + Math.random() * 3000 : undefined
          } : p
        ));
        const finalEvent = { ...event, id: randomId("evt"), type: `payment.${finalStatus}`, status: finalStatus, timestamp: new Date() };
        setWebhookEvents(prev => [finalEvent, ...prev].slice(0, 50));
        setLastEvent(finalEvent);
      }, 3000 + Math.random() * 4000);

    } else if (eventType < 0.75) {
      // 15% chance: update existing pending/processing payment
      setPayments(prev => {
        const pending = prev.filter(p => p.status === "pending" || p.status === "processing");
        if (pending.length === 0) return prev;
        
        const toUpdate = randomChoice(pending);
        const newStatus: PaymentStatus = Math.random() > 0.2 ? "completed" : "failed";
        
        const event: DemoWebhookEvent = {
          id: randomId("evt"),
          paymentId: toUpdate.id,
          type: `payment.${newStatus}`,
          status: newStatus,
          timestamp: new Date(),
          data: { amount: toUpdate.amount, currency: toUpdate.currency },
        };
        
        setWebhookEvents(prevEvents => [event, ...prevEvents].slice(0, 50));
        setLastEvent(event);
        
        return prev.map(p => 
          p.id === toUpdate.id ? { 
            ...p, 
            status: newStatus, 
            updatedAt: new Date(),
            processingTime: newStatus === "completed" ? 2000 + Math.random() * 3000 : undefined
          } : p
        );
      });
    } else {
      // 25% chance: refund a completed payment
      setPayments(prev => {
        const completed = prev.filter(p => p.status === "completed");
        if (completed.length === 0) return prev;
        
        const toRefund = randomChoice(completed);
        
        const event: DemoWebhookEvent = {
          id: randomId("evt"),
          paymentId: toRefund.id,
          type: "payment.refunded",
          status: "refunded",
          timestamp: new Date(),
          data: { amount: toRefund.amount, reason: "customer_request" },
        };
        
        setWebhookEvents(prevEvents => [event, ...prevEvents].slice(0, 50));
        setLastEvent(event);
        
        return prev.map(p => 
          p.id === toRefund.id ? { ...p, status: "refunded" as PaymentStatus, updatedAt: new Date() } : p
        );
      });
    }
  }, []);

  // Auto-simulation
  useEffect(() => {
    if (isSimulating) {
      intervalRef.current = setInterval(simulateEvent, eventInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSimulating, eventInterval, simulateEvent]);

  // Calculate stats
  const stats: DemoStats = (() => {
    const completed = payments.filter(p => p.status === "completed");
    const failed = payments.filter(p => p.status === "failed");
    const pending = payments.filter(p => p.status === "pending");
    const processing = payments.filter(p => p.status === "processing");
    const refunded = payments.filter(p => p.status === "refunded");

    const totalRevenue = completed.reduce((sum, p) => sum + p.amount, 0);
    const totalWithOutcome = completed.length + failed.length;
    const successRate = totalWithOutcome > 0 ? (completed.length / totalWithOutcome) * 100 : 0;
    
    const processingTimes = completed.filter(p => p.processingTime).map(p => p.processingTime!);
    const avgProcessingTime = processingTimes.length > 0 
      ? processingTimes.reduce((a, b) => a + b, 0) / processingTimes.length 
      : 0;

    // Revenue by hour (last 6 hours)
    const now = new Date();
    const revenueByHour: { hour: string; amount: number; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - i * 3600000);
      const hourEnd = new Date(hourStart.getTime() + 3600000);
      const hourPayments = completed.filter(p => 
        p.createdAt >= hourStart && p.createdAt < hourEnd
      );
      revenueByHour.push({
        hour: hourStart.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
        amount: hourPayments.reduce((sum, p) => sum + p.amount, 0),
        count: hourPayments.length,
      });
    }

    // Status breakdown
    const total = payments.length || 1;
    const statusBreakdown: DemoStats["statusBreakdown"] = [
      { status: "completed", count: completed.length, percentage: (completed.length / total) * 100 },
      { status: "pending", count: pending.length, percentage: (pending.length / total) * 100 },
      { status: "processing", count: processing.length, percentage: (processing.length / total) * 100 },
      { status: "failed", count: failed.length, percentage: (failed.length / total) * 100 },
      { status: "refunded", count: refunded.length, percentage: (refunded.length / total) * 100 },
    ];

    return {
      totalRevenue,
      totalTransactions: payments.length,
      completedCount: completed.length,
      failedCount: failed.length,
      pendingCount: pending.length,
      processingCount: processing.length,
      refundedCount: refunded.length,
      successRate,
      avgProcessingTime,
      revenueByHour,
      statusBreakdown,
    };
  })();

  return {
    payments,
    webhookEvents,
    stats,
    lastEvent,
    isSimulating,
    setIsSimulating,
    simulateEvent,
    addPayment: (payment: DemoPayment) => {
      setPayments(prev => [payment, ...prev].slice(0, 100));
      const event = generateWebhookEvent(payment);
      setWebhookEvents(prev => [event, ...prev].slice(0, 50));
      setLastEvent(event);
    },
  };
}
