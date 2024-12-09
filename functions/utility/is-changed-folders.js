import { listFolder } from "../utility/list-folder.js";

export async function isChangedFolders(pcloudToken, containerFolderId) {
  const list = await listFolder(pcloudToken, containerFolderId);
  const status = {};

  for (const item of list) {
    if (item.name === "gallery") {
      status.gallery = item.modified;
    }

    if (item.name === "thumbs") {
      status.thumbs = item.modified;
    }
  }

  new Date(status.gallery) > new Date(status.thumbs)
    ? (status.changed = true)
    : (status.changed = false);

  if (status.changed) {
    for (const item of list) {
      if (item.name === "processing.txt") {
        status.changed = false;
      }
    }
  }

  return status;
}
