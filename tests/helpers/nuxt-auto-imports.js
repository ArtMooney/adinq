// Match the Nitro auto-imports used by the existing CMS handlers.
export {
  createError,
  defineEventHandler,
  getHeaders,
  getRequestURL,
  readBody,
} from "h3";

export function useRuntimeConfig() {
  return {
    userName: "test-public-user",
    userPass: "test-public-password",
    emailFrom: "sender@example.test",
    mailgunApiKey: "unused-test-key",
  };
}
