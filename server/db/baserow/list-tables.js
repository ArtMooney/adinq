import { getToken } from "./get-token.js";

export async function listTables(username, password, database_id) {
  const token = await getToken(username, password);

  const headersList = {
    Accept: "*/*",
    Authorization: "JWT " + token.token,
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let response = await fetch(
        `https://api.baserow.io/api/database/tables/database/${database_id}/`,
        {
          method: "GET",
          headers: headersList,
        },
      );

      if (!response.ok) {
        return { error: `HTTP error! status: ${response.status}` };
      }

      return await response.json();
    } catch (error) {
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        return { error: `Network error: ${error.message}` };
      }
    }
  }
}
