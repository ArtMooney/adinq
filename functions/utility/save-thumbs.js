import { listFolder } from "../utility/list-folder.js";

export async function saveThumbs(pcloudToken, galleryFolderId, thumbsFolderId) {
  let gallery = await listFolder(pcloudToken, galleryFolderId);

  for (const image of gallery) {
    let response = await fetch(
      `https://api.pcloud.com/savethumb?fileid=${image.fileid}&tofolderid=${thumbsFolderId}&toname=${image.name.substring(0, image.name.lastIndexOf("."))}.jpg&size=500x700`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + pcloudToken,
        },
      },
    );
  }

  return "ok";
}
