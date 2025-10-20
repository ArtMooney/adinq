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

  const newData = {
    title: "Test",
    screenshot: "https://filedn.com/lODGkE8bRyjVm8tpT986SXj/IMG_7323.JPG",
    filmtyp: "butiksfilm",
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const db = useDrizzle(event.context.cloudflare.env.DB);

  try {
    await db.insert(mediaproduktioner).values(newData);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to insert data",
    });
  }
});
