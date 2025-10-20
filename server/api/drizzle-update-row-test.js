import { checkLogin } from "../utils/check-login.js";
import { useDrizzle } from "../db/client";
import { eq } from "drizzle-orm";
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
    title: "Eskilstuna kommun",
    qCardLink: "https://qcard.adinq.se/?i=1733225116",
    screenshot: "https://filedn.com/lODGkE8bRyjVm8tpT986SXj/images.jpeg",
    filmtyp: "butiksfilm",
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const db = useDrizzle(event.context.cloudflare.env.DB);

  try {
    await db
      .update(mediaproduktioner)
      .set(newData)
      .where(eq(mediaproduktioner.id, 1));

    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to insert data",
    });
  }
});
