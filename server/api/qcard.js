import { checkLogin } from "../utils/check-login.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }
  
  const query = getQuery(event);
  const qcardUrl = query.url;

  if (!qcardUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing Q-card URL parameter",
    });
  }

  try {
    const urlParam = qcardUrl.split("?")[1];

    if (!urlParam) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Invalid Q-card URL format. Expected format: https://qcard.adinq.se/?i=xxxxxxxxx",
      });
    }

    const apiUrl = `https://qcard.adinq.se/api/api-qcard.js.asp?${urlParam}`;
    const scriptContent = await $fetch(apiUrl, { responseType: "text" });

    let videoUrl = null;
    const filmUrlMatch = scriptContent.match(/filmurl\s*=\s*["']([^"']+)["']/i);

    if (filmUrlMatch && filmUrlMatch[1]) {
      videoUrl = filmUrlMatch[1];
    }

    if (!videoUrl) {
      throw new Error("No video URL found in the script content");
    }

    return "https://qcard.adinq.se" + videoUrl;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to extract video URL",
      data: error,
    });
  }
});
