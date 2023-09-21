const urlBase64Decode = (input: string) => {
  // decode the base64 string
  const base64Decoded = atob(input);

  // URL-decode the data
  const urlDecoded = decodeURIComponent(base64Decoded);

  // parse the JSON data
  return JSON.parse(urlDecoded);
};

export { urlBase64Decode };
