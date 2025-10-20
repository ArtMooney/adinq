import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

const useLocal = process.env.USE_LOCAL_DB === "true";

function getLocalDbPath() {
  const wranglerDir = "./.wrangler/state/v3/d1/miniflare-D1DatabaseObject";

  try {
    if (!fs.existsSync(wranglerDir)) {
      throw new Error(
        "Wrangler database directory not found. Run `npm run dev` or `wrangler dev` first.",
      );
    }

    const files = fs.readdirSync(wranglerDir);
    const sqliteFile = files.find((file) => file.endsWith(".sqlite"));

    if (!sqliteFile) {
      throw new Error("No .sqlite file found in Wrangler directory.");
    }

    return path.join(wranglerDir, sqliteFile);
  } catch (error) {
    console.error("❌ Could not find local database.");
    console.error(
      "💡 Make sure to run `npm run dev` or `wrangler dev` first to create the local database.",
    );
    throw error;
  }
}

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",

  ...(useLocal
    ? {
        dbCredentials: {
          url: getLocalDbPath(),
        },
      }
    : {
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.NUXT_CLOUDFLARE_ACCOUNT_ID!,
          databaseId: process.env.NUXT_CLOUDFLARE_DATABASE_ID!,
          token: process.env.NUXT_CLOUDFLARE_D1_TOKEN!,
        },
      }),
});
