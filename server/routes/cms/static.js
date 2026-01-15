import { checkLogin } from "~~/server/utils/check-login.js";
import { useDrizzle } from "~~/server/db/client.ts";
import { static_content } from "~~/server/db/schema.ts";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);
  return db.select().from(static_content).all();
});
