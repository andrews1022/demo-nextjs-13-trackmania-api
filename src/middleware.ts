import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "./lib/prisma";

// This function can be marked `async` if using `await` inside
const middleware = async (request: NextRequest) => {
  // console.log("middleware running!!!");

  // return NextResponse.json(request)
  const apiTokenTest = await prisma.apiToken.findUnique({
    where: {
      tokenId: "c1Z1oSjpTT3REWxoeuK0xcWQBj"
    }
  });
  console.log("apiTokenTest: ", apiTokenTest);
};

export { middleware };
