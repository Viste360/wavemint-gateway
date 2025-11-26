import axios from "axios";

export const forward = async (url, options = {}) => {
  const method = options.method || "GET";
  const headers = options.headers || {};
  const body = options.body;

  const axiosOptions = {
    method,
    url,
    headers,
    responseType: "arraybuffer", // can handle JSON or binary
    data: body,
    validateStatus: () => true, // allow backend to return errors
  };

  const res = await axios(axiosOptions);

  const contentType = res.headers["content-type"];

  if (contentType && contentType.includes("application/json")) {
    return JSON.parse(res.data.toString());
  }

  return res.data;
};
