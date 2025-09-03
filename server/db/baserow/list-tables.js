import { getToken } from "./get-token.js";

export async function listTables(username, password, database_id) {
  const url = `https://api.baserow.io/api/database/tables/database/${database_id}/`;
  const token = await getToken(username, password);

  try {
    return await $fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },

      retry: 3,
      retryDelay: 1000,
      retryStatusCodes: [408, 429, 500, 502, 503, 504],
    });
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
