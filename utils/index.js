export { default as axios } from "./axiosInstance";

/**
 * Upgrade an HTTP URL to HTTPS.
 * Returns the original value unchanged if it's not an http:// URL.
 */
export function ensureHttps(url) {
  if (typeof url !== "string") return url;
  return url.replace(/^http:\/\//i, "https://");
}