-- CreateTable
CREATE TABLE "MarketPlace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "marketPlaceGlobalPromt" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "MarketPlace_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
