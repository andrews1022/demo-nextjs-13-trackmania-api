-- CreateTable
CREATE TABLE "ApiToken" (
    "tokenId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("tokenId")
);
