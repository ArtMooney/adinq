export async function uploadProcessFile(pcloudToken, folderId) {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + pcloudToken,
  };

  const textContent = "processing";
  const blob = new Blob([textContent], { type: "text/plain" });
  const formData = new FormData();
  formData.append("file", blob, "processing.txt");

  let response = await fetch(
    `https://api.pcloud.com/uploadfile?folderid=${folderId}`,
    {
      method: "POST",
      headers: headersList,
      body: formData,
    },
  );

  let result = JSON.parse(await response.text());
  result = result.metadata;

  return result[0];
}
