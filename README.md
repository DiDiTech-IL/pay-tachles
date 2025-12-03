# Tachles Pay

**Self-hostable, unopinionated payment management infrastructure.**

Track payments across providers, manage webhooks, and maintain complete visibility—all on your own infrastructure.

## ✨ Highlights

- 🏠 **Self-Hosted** - Run on your own VPS, Cloudflare Workers, Vercel, or anywhere JavaScript runs
- 🔌 **Provider Agnostic** - Works with Stripe, PayPal, Square, or any payment provider
- 🗄️ **Flexible Storage** - In-memory (no setup), PostgreSQL, MySQL, SQLite, or custom
- ⚡ **Edge Ready** - Native support for Cloudflare Workers, Deno, Bun, and Edge runtimes
- 🛠️ **Type-Safe** - Built with TypeScript and Effect for robust error handling
- 🔒 **Secure** - HMAC webhook verification, API key authentication

## 🚀 Quick Start

### Zero-Config Mode (In-Memory)

No database setup required—perfect for development or single-instance deployments:

```bash
# Clone and install
git clone https://github.com/your-org/tachles-pay
cd tachles-pay
npm install

# Run with in-memory storage (no database needed!)
TACHLES_WEBHOOK_SECRET=your-secret-here npm run dev
```

That's it! Open [http://localhost:3000](http://localhost:3000).

### Production Mode (PostgreSQL + Redis)

```bash
# Set environment variables
export DATABASE_URL="postgresql://user:pass@localhost:5432/tachles"
export REDIS_URL="redis://localhost:6379"
export TACHLES_WEBHOOK_SECRET="your-production-secret"
export TACHLES_DATABASE_PROVIDER="prisma"
export TACHLES_STORAGE_PROVIDER="redis"

# Setup database
npm run db:generate
npm run db:push

# Run
npm run build && npm start
```

## 📦 Deployment Options

### Cloudflare Workers

```typescript
// worker.ts
import { Tachles, createMemoryConfig } from "tachles-pay";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const config = createMemoryConfig(env.WEBHOOK_SECRET);
    const tachles = Tachles.create(config);
    
    // Handle your routes...
  }
};
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel / Netlify

Works out of the box with Edge Functions. Set environment variables in your dashboard.

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TACHLES_WEBHOOK_SECRET` | Yes | - | Secret for signing webhooks |
| `TACHLES_DATABASE_PROVIDER` | No | `memory` | `memory`, `prisma` |
| `DATABASE_URL` | If using Prisma | - | Database connection string |
| `TACHLES_STORAGE_PROVIDER` | No | `memory` | `memory`, `upstash`, `redis` |
| `REDIS_URL` | If using Redis | - | Redis connection string |
| `PORT` | No | `3000` | Server port |

### Programmatic Configuration

```typescript
import { Tachles, createMemoryConfig, createProductionConfig } from "tachles-pay";

// Development (no external services)
const devConfig = createMemoryConfig("dev-secret");

// Production
const prodConfig = createProductionConfig({
  databaseUrl: process.env.DATABASE_URL!,
  upstashUrl: process.env.UPSTASH_URL!,
  upstashToken: process.env.UPSTASH_TOKEN!,
  webhookSecret: process.env.WEBHOOK_SECRET!,
});

const tachles = Tachles.create(prodConfig);
```

## 📚 API Reference

### Authentication

```bash
Authorization: Bearer YOUR_API_KEY
```

### Create a Payment Intent (Payup)

```bash
curl -X POST http://localhost:3000/api/payups \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "USD",
    "customerEmail": "customer@example.com",
    "returnUrl": "https://your-site.com/success"
  }'
```

### List Transactions

```bash
curl http://localhost:3000/api/transactions \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Webhook Verification

```typescript
import { WebhookSecurityService } from "tachles-pay";

const isValid = await verifyWebhook(
  request.headers.get("x-tachles-signature"),
  await request.text(),
  webhookSecret
);
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                          │
├─────────────────────────────────────────────────────────────┤
│                    Tachles Pay SDK                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Apps      │  │   Payups    │  │    Transactions     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Provider Facades                          │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │  Database Provider  │  │     Storage Provider         │  │
│  │  • Memory           │  │     • Memory                 │  │
│  │  • Prisma           │  │     • Upstash                │  │
│  │  • (Your custom)    │  │     • Redis                  │  │
│  └─────────────────────┘  └──────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Runtime Adapters                          │
│  Node.js │ Cloudflare Workers │ Deno │ Bun │ Edge           │
└─────────────────────────────────────────────────────────────┘
```

## 🔌 Custom Providers

### Custom Database Provider

```typescript
import { DatabaseProvider, createDatabaseLayer } from "tachles-pay";

const myProvider: DatabaseProvider = {
  connect: () => Effect.succeed(undefined),
  disconnect: () => Effect.succeed(undefined),
  isConnected: () => true,
  
  listApps: () => Effect.succeed([/* your implementation */]),
  createApp: (data) => Effect.succeed(/* your implementation */),
  // ... implement all methods
};

const MyDatabaseLayer = createDatabaseLayer(myProvider);
```

### Custom Storage Provider

```typescript
import { StorageProvider, createStorageLayer } from "tachles-pay";

const myStorage: StorageProvider = {
  get: (key) => Effect.succeed(/* ... */),
  set: (key, value, ttl) => Effect.succeed(undefined),
  // ... implement all methods
};

const MyStorageLayer = createStorageLayer(myStorage);
```

## 📁 Project Structure

```
├── src/
│   ├── config.ts              # Configuration system
│   ├── index.ts               # Main entry point
│   ├── domain/                # Domain types & errors
│   ├── runtime/               # Runtime adapters
│   ├── services/
│   │   ├── database/          # Database providers
│   │   │   ├── provider.ts    # Interface
│   │   │   ├── memory-provider.ts
│   │   │   └── prisma-provider.ts
│   │   ├── storage/           # Cache/KV providers
│   │   │   ├── provider.ts    # Interface
│   │   │   ├── memory-provider.ts
│   │   │   └── upstash-provider.ts
│   │   └── ...
│   └── workflows/             # Business logic workflows
├── app/                       # Next.js UI (optional)
├── prisma/                    # Prisma schema (optional)
└── workers/                   # Cloudflare Workers (optional)
```

## 🤝 Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

MIT

---

**Built with ❤️ for developers who want control over their payment infrastructure.**
