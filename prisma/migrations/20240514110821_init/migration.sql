-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "storeLocalPromt" TEXT NOT NULL,
    "marketPlaceId" TEXT NOT NULL,
    CONSTRAINT "Store_marketPlaceId_fkey" FOREIGN KEY ("marketPlaceId") REFERENCES "MarketPlace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "vendorCode" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productLocalPromt" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
