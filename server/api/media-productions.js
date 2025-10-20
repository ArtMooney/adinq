import { checkLogin } from "../utils/check-login.js";
import { useDrizzle } from "../db/client";
import { mediaproduktioner } from "../db/schema";

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
  return await db.select().from(mediaproduktioner);
});
