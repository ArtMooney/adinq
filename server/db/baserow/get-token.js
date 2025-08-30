export async function getToken(username, password) {
  const url = `https://api.baserow.io/api/user/token-auth/`;

  try {
    return await $fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),

      retry: 3,
      retryDelay: 1000,
      retryStatusCodes: [408, 429, 500, 502, 503, 504],
    });
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
