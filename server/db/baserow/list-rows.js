export async function listRows(token, tableid, asc, orderBy, search) {
  const url = `https://api.baserow.io/api/database/rows/table/${tableid}/`;

  try {
    return await $fetch(url, {
      method: "GET",
      query: {
        user_field_names: true,
        ...(orderBy ? { order_by: `${!asc ? "-" : ""}${orderBy}` } : {}),
        ...(search ? { search } : {}),
      },
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
