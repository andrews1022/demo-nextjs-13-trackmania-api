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

export type TrackmaniaTrack = {
  author: string;
  authorTime: number;
  bronzeTime: number;
  collectionName: string;
  downloadUrl: string;
  favorite: boolean;
  fileSize: null;
  gamepadEditor: boolean;
  goldTime: number;
  mapId: string;
  mapStyle: string;
  mapType: string;
  name: string;
  nbLaps: number;
  playable: boolean;
  public: boolean;
  silverTime: number;
  submitter: string;
  thumbnailUrl: string;
  uid: string;
  updateTimestamp: number;
  uploadTimestamp: number;
  valid: boolean;
};
