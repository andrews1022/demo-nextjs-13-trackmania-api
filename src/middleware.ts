import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/prisma";
import { unixTimestampToDate, urlBase64Decode } from "./lib/utils";

import type { AuthTokenResp } from "./types";

// This function can be marked `async` if using `await` inside
const middleware = async (request: NextRequest) => {
  // console.log("middleware running!!!");
  // return NextResponse.json(request)
  // const apiTokenTest = await prisma.apiToken.findUnique({
  //   where: {
  //     tokenId: "c1Z1oSjpTT3REWxoeuK0xcWQBj"
  //   }
  // });
  // console.log("apiTokenTest: ", apiTokenTest);

  try {
    const mostRecentApiToken = await prisma.apiToken.findFirst({
      orderBy: {
        addedOn: "desc"
      }
    });

    if (mostRecentApiToken) {
      const { accessToken, expirationDate } = mostRecentApiToken;

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
        const { accessToken, refreshToken } = newTokens;

        const [header, payload, structure] = accessToken.split(".");
        const { exp, rat } = urlBase64Decode(payload);
        const newExpDate = unixTimestampToDate(rat);

        await prisma.apiToken.create({
          data: {
            accessToken,
            expirationDate: newExpDate,
            refreshToken,
            addedOn: new Date()
          }
        });
      } else {
        console.log("the token is valid - you good!");
      }

      // clone the request headers and set a new header `x-hello-from-middleware1`
      const requestHeaders = new Headers(request.headers);

      requestHeaders.set("Authorization", `nadeo_v1 t=${accessToken}`);

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });
      // NextResponse.next({
      //   request: {
      //     // New request headers
      //     headers: requestHeaders
      //   }
      // });
    }

    // console.log("mostRecentApiToken: ", mostRecentApiToken);
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
