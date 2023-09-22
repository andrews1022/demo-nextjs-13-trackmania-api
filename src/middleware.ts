import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/prisma";
import { unixTimestampToDate, urlBase64Decode } from "./lib/utils";

import type { AuthTokenResp } from "./types";

const middleware = async (request: NextRequest) => {
  try {
    const mostRecentApiToken = await prisma.apiToken.findFirst({
      orderBy: {
        addedOn: "desc"
      }
    });

    if (mostRecentApiToken) {
      const { accessToken, expirationDate, refreshToken } = mostRecentApiToken;

      const tokenExpirationDate = new Date(expirationDate);
      const currentDate = new Date();

      // compare the current date to the expiration date
      if (currentDate > tokenExpirationDate) {
        console.log("the token is expired - get a new one");

        const url = "https://prod.trackmania.core.nadeo.online/v2/authentication/token/basic";
        const login = process.env.TM_SERVER_ACCOUNT_LOGIN;
        const password = process.env.TM_SERVER_ACCOUNT_PASSWORD;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${login}:${password}`)}`
          },
          body: JSON.stringify({
            audience: "NadeoLiveServices"
          })
        });

        if (!res.ok) {
          const text = await res.text(); // get the response body for more information

          throw new Error(`
            Failed to fetch data
            Status: ${res.status}
            Response: ${text}
          `);
        }

        const newTokens: AuthTokenResp = await res.json();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = newTokens;

        const [header, payload, structure] = newAccessToken.split(".");
        const { exp, rat } = urlBase64Decode(payload);
        const newExpirationDate = unixTimestampToDate(rat);

        await prisma.apiToken.create({
          data: {
            accessToken: newAccessToken,
            expirationDate: newExpirationDate,
            refreshToken: newRefreshToken,
            addedOn: new Date()
          }
        });
      }

      console.log("the token is valid - you good!");

      // clone the request headers and set a new header `x-hello-from-middleware1`
      const requestHeaders = new Headers(request.headers);

      requestHeaders.set("Authorization", `nadeo_v1 t=${accessToken}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong!"
      },
      {
        status: 500
      }
    );
  }
};

export { middleware };
