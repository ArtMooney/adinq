export async function listFields(token, table_id) {
  const url = `https://api.baserow.io/api/database/fields/table/${table_id}/`;

  try {
    return await $fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },

      retry: 3,
      retryDelay: 1000,
      retryStatusCodes: [408, 429, 500, 502, 503, 504],
    });
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
