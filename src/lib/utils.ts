import { DecodedPayload } from "@/types/api";

const unixTimestampToDate = (unixTimestamp: number): Date => {
  return new Date(unixTimestamp * 1000);
};

const urlBase64Decode = (payload: string): DecodedPayload => {
  // decode the base64 string
  const base64Decoded = atob(payload);

  // URL-decode the data
  const urlDecoded = decodeURIComponent(base64Decoded);

  // parse the JSON data
  return JSON.parse(urlDecoded);
};

export { unixTimestampToDate, urlBase64Decode };
