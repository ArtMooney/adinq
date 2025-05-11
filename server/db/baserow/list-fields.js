import { getToken } from "./get-token.js";

export async function listFields(username, password, table_id) {
  const token = await getToken(username, password);

  const headersList = {
    Accept: "*/*",
    Authorization: "JWT " + token.token,
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let response = await fetch(
        `https://api.baserow.io/api/database/fields/table/${table_id}/`,
        {
          method: "GET",
          headers: headersList,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        return null;
      }
    }
  }
}
