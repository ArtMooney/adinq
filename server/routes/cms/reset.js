import { checkLogin } from "~~/server/utils/check-login.js";
import { randomUUID } from "crypto";
import { sendEmail } from "~~/server/utils/mailgun/send-email.js";
import { messageEmailReset } from "~~/server/routes/cms/content/message-email-reset.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { users } from "~~/server/db/schema.ts";
import { eq, sql } from "drizzle-orm";
import {
  getAdminRequestURL,
  requireAdminPost,
} from "~~/server/utils/admin-session.js";

export default defineEventHandler(async (event) => {
  requireAdminPost(event);
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  const body = await readBody(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (typeof body?.email !== "string" || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);
  const user = await db
    .select()
    .from(users)
    .where(eq(sql`${users.email} COLLATE NOCASE`, body.email.trim()));

  if (user.length === 0) {
    return "ok"; // User not found, return same as if ok is a security measure
  }

  const resetId = randomUUID();

  try {
    await db
      .update(users)
      .set({ resetId: resetId })
      .where(eq(users.id, user[0].id));
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error saving user",
    });
  }

  const sendToEmail = await sendEmail(
    config.emailFrom,
    user[0].email,
    "Change password for your account on Simple CMS",
    await messageEmailReset(
      new URL("/admin", getAdminRequestURL(event)).href,
      resetId,
    ),
    config.mailgunApiKey,
  );

  return "ok";
});
