import { hashPassword } from "~~/server/routes/cms/utils/password.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { users } from "~~/server/db/schema.ts";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const db = useDrizzle(event.context.cloudflare.env.DB);
  const allUsers = await db.select().from(users);

  for (const user of allUsers) {
    const hashedPassword = await hashPassword(user.password);
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, user.id));
  }

  return { migrated: allUsers.length };
});
