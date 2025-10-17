import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.NUXT_CLOUDFLARE_ACCOUNT_ID,
    databaseId: process.env.NUXT_CLOUDFLARE_DATABASE_ID,
    token: process.env.NUXT_CLOUDFLARE_D1_TOKEN,
  },
});
