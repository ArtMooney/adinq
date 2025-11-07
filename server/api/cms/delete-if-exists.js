import { fileExists } from "~~/server/api/cms/file-exists.js";

export async function deleteIfExists(bucket, key) {
  try {
    if (await fileExists(bucket, key)) {
      await bucket.delete(key);
      return true;
    }

    return false;
  } catch (error) {
    throw new Error(`Fel vid borttagning: ${error.message}`);
  }
}
