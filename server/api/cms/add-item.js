import { checkLogin } from "~/server/utils/check-login.js";
import { createRow } from "~/server/db/baserow/create-row.js";
import { uploadFile } from "~/server/db/baserow/upload-file.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email or password",
    });
  }

  for (const field of body.schema) {
    if (body.item[field.name]) {
      if (
        field.type === "file" &&
        body.item[field.name].length > 0 &&
        !body.item[field.name][0].url
      ) {
        const file = await uploadFile(
          config.baserowToken,
          body.item[field.name][0].name,
          body.item[field.name][0].file,
        );

        body.item[field.name] = [file];
      }
    }
  }

  return await createRow(
    config.baserowToken,
    body.schema.find((item) => item.table_id)?.table_id,
    body.item,
  );
});
