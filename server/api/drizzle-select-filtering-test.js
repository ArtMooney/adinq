import { checkLogin } from "../utils/check-login.js";
import { useDrizzle } from "../db/client";
import { eq, like } from "drizzle-orm";
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

  try {
    return await db
      .select()
      .from(mediaproduktioner)
      .where(like(mediaproduktioner.title, "%Test%"));
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to insert data",
    });
  }
});
