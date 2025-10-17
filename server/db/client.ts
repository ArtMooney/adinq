import { drizzle } from "drizzle-orm/d1";
import { users, mediaproduktioner } from "./schema";
import type { D1Database } from "@cloudflare/workers-types";

declare module "#drizzle" {
  interface DrizzleEnv {
    DB: D1Database;
  }
}

export const db = drizzle(import.meta.env.DB as D1Database, {
  schema: { users, mediaproduktioner },
});
