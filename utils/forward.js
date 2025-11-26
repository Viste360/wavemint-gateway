import axios from "axios";

export const forward = async (url, options = {}) => {
  const response = await axios({
    url,
    method: options.method || "GET",
    data: options.body,
    headers: options.headers || {},
    responseType: "arraybuffer"
  });

  const contentType = response.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    return JSON.parse(Buffer.from(response.data).toString());
  }

  return response.data;
};
