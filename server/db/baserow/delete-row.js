export async function deleteRow(token, tableId, rowId) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let response = await fetch(
        `https://api.baserow.io/api/database/rows/table/${tableId}/${rowId}/`,
        {
          method: "DELETE",
          headers: headersList,
        },
      );

      if (!response.ok) {
        return { error: `HTTP error! status: ${response.status}` };
      }

      return { status: response.status };
    } catch (error) {
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        return { error: `Network error: ${error.message}` };
      }
    }
  }
}
