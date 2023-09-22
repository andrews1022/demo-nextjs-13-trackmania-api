export type AuthTokenResp = {
  accessToken: string;
  refreshToken: string;
};

export type DecodedPayload = {
  aud: string;
  aun: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  pce: boolean;
  rat: number;
  rtk: boolean;
  sid: string;
  sub: string;
  usg: string;
};
