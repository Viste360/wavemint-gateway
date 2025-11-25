import fetch from "node-fetch";

export const forward = async (url, options = {}) => {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type");

  // If it's JSON → return JSON
  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  // Otherwise return raw buffer (for media files)
  return await res.arrayBuffer();
};
