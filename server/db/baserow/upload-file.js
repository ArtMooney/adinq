export async function uploadFile(token, fileName, base64Data) {
  const byteCharacters = atob(base64Data);
  let byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/octet-stream" });

  let bodyContent = new FormData();
  bodyContent.append("file", blob, fileName);

  let headersList = {
    Accept: "*/*",
    Authorization: "Token " + token,
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let response = await fetch(
        "https://api.baserow.io/api/user-files/upload-file/",
        {
          method: "POST",
          body: bodyContent,
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
