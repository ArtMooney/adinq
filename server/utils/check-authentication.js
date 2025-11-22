import { useDrizzle } from "~~/server/db/client.ts";
import { users } from "~~/server/db/schema.ts";
import { like } from "drizzle-orm";

export async function checkAuthentication(event, email, password) {
  if (!email || !password) return false;

  const db = useDrizzle(event.context.cloudflare.env.DB);
  const user = await db.select().from(users).where(like(users.email, email));

  return user && user[0].password === password;
}
