export async function uploadFile(bucket, fileName, base64Data, contentType) {
  try {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const key = `${fileName}-${Date.now()}`;

    await bucket.put(`cms-images/${key}`, byteArray, {
      httpMetadata: { contentType: contentType || "application/octet-stream" },
    });

    return key;
  } catch (error) {
    throw new Error(`Uppladdningsfel: ${error.message}`);
  }
}
