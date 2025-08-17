export async function uploadFile(token, fileName, base64Data) {
  const url = "https://api.baserow.io/api/user-files/upload-file/";
  const byteCharacters = atob(base64Data);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });

  let bodyContent = new FormData();
  bodyContent.append("file", blob, fileName);

  try {
    return await $fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Token ${token}`,
      },
      body: bodyContent,

      retry: 3,
      retryDelay: 1000,
      retryStatusCodes: [408, 429, 500, 502, 503, 504],
    });
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}
