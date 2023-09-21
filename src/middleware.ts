import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const middleware = (request: NextRequest) => {
  console.log("middleware running!!!");
  // return NextResponse.json(request)
};

export { middleware };
