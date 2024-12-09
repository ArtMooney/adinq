export async function deleteOldThumbs(pcloudToken, thumbsFolderId) {
  let thumbs = await listFolder(pcloudToken, thumbsFolderId);

  for (const thumb of thumbs) {
    await deleteFile(pcloudToken, thumb.fileid);
  }

  return "ok";
}
