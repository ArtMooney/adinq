import { createError, defineEventHandler, readBody } from "h3";
import { eq, sql } from "drizzle-orm";
import { verifyPassword } from "./utils/password.js";
import { useDrizzle } from "../../db/client.ts";
import { users } from "../../db/schema.ts";
import {
  createAdminSession,
  requireAdminPost,
} from "../../utils/admin-session.js";

export default defineEventHandler(async (event) => {
  requireAdminPost(event);
  const body = await readBody(event);
  if (
    typeof body?.email !== "string" ||
    typeof body?.password !== "string" ||
    !body.email ||
    !body.password ||
    body.email.length > 254 ||
    body.password.length > 1024
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid credentials",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);
  const user = await db
    .select()
    .from(users)
    .where(eq(sql`${users.email} COLLATE NOCASE`, body.email.trim()))
    .get();

  if (!user || !(await verifyPassword(body.password, user.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  return { success: true, ...(await createAdminSession(event, user)) };
});
