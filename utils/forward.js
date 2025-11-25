// forwards requests to backend microservices
export const forward = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};
