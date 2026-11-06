import { checkLogin } from "~~/server/utils/check-login.js";
import { hashPassword } from "~~/server/routes/cms/utils/password.js";
import { sendEmail } from "~~/server/utils/mailgun/send-email.js";
import { messageNewPassword } from "~~/server/routes/cms/content/message-new-password.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { adminSessions, users } from "~~/server/db/schema.ts";
import { and, eq, sql } from "drizzle-orm";
import {
  deleteAdminSession,
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

  if (
    typeof body?.password !== "string" ||
    !body.password ||
    body.password.length > 1024 ||
    typeof body?.validation !== "string" ||
    !body.validation
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing password or validation",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);
  const user = await db
    .select()
    .from(users)
    .where(eq(users.resetId, body.validation));

  if (!user || user.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Error validating account",
    });
  }

  const hashedPassword = await hashPassword(body.password);

  let updated;
  try {
    [updated] = await db.batch([
      db
        .update(users)
        .set({ password: hashedPassword, resetId: "" })
        .where(
          and(eq(users.id, user[0].id), eq(users.resetId, body.validation)),
        )
        .returning({ id: users.id }),
      db
        .delete(adminSessions)
        .where(
          and(
            eq(adminSessions.userId, user[0].id),
            sql`EXISTS (SELECT 1 FROM ${users} WHERE ${users.id} = ${user[0].id} AND ${users.password} = ${hashedPassword})`,
          ),
        ),
    ]);
    await deleteAdminSession(event);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error saving password",
    });
  }

  if (updated.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid validation code",
    });
  }

  const sendToEmail = await sendEmail(
    config.emailFrom,
    user[0].email,
    "Your password to log into Simple CMS was changed",
    await messageNewPassword(),
    config.mailgunApiKey,
  );

  return "ok";
});
