export async function updateRows(token, tableId, data) {
  const url = `https://api.baserow.io/api/database/rows/table/${tableId}/batch/?user_field_names=true`;

  try {
    return await $fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),

      retry: 3,
      retryDelay: 1000,
      retryStatusCodes: [408, 429, 500, 502, 503, 504],
    });
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
