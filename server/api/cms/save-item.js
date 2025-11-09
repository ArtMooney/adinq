import { checkLogin } from "~~/server/utils/check-login.js";
import { checkAuthentication } from "~~/server/utils/check-authentication.js";
import { uploadFile } from "~~/server/api/cms/upload-file.js";
import { deleteIfExists } from "~~/server/api/cms/delete-if-exists.js";
import { cmsTables } from "~~/server/db/schema.ts";
import { useDrizzle } from "~~/server/db/client.ts";
import * as schema from "~~/server/db/schema.ts";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  const body = await readBody(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!(await checkAuthentication(event, body?.email, body?.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Failed to login",
    });
  }

  const bucket = event.context.cloudflare?.env.FILES;
  if (!bucket) {
    throw createError({
      statusCode: 500,
      message: "R2-binding is missing",
    });
  }

  for (const field of body.schema) {
    if (body.item[field.name]) {
      if (field?.type?.value === "file" || field?.type?.value === "fileImg") {
        if (body?.item[field?.name][0]?.backupName) {
          await deleteIfExists(
            bucket,
            `cms-images/${body.item[field.name][0].backupName}`,
          );
        }

        if (body?.item[field?.name][0]?.file?.length > 0) {
          body.item[field.name] = await uploadFile(
            bucket,
            body.item[field.name][0].name,
            body.item[field.name][0].file,
            body.item[field.name][0].contentType,
          );
        } else {
          body.item[field.name] = "";
        }
      }
    }
  }

  const tableName = body?.table_id;

  if (!cmsTables.some((t) => t.id === tableName)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid table",
    });
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);

  try {
    const updatedItem = await db
      .update(schema[tableName])
      .set(body.item)
      .where(eq(schema[tableName].id, body.item.id))
      .returning();

    return updatedItem[0];
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to update item",
    });
  }
});
