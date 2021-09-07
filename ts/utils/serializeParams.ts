const serializeParams = (obj: Record<string, string | number>) => {
  return Object.keys(obj)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
};
export default serializeParams;
