export async function getRow(token, table_id, row_id) {
  let headersList = {
    Accept: "*/*",
    Authorization: "Token " + token,
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let response = await fetch(
        `https://api.baserow.io/api/database/rows/table/${table_id}/${row_id}/?user_field_names=true`,
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
