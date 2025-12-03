import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    react: "src/react.ts",
    server: "src/server.ts",
    "stats/index": "src/stats/index.ts",
    "operations/index": "src/operations/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "utils/index": "src/utils/index.ts",
    "adapters/cloudflare": "src/adapters/cloudflare.ts",
    "adapters/node": "src/adapters/node.ts",
    "components/index": "src/components/index.tsx",
    "client/index": "src/client/index.ts",
    "db-hooks/index": "src/db-hooks/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  external: ["@upstash/redis", "@prisma/client", "react"],
});
