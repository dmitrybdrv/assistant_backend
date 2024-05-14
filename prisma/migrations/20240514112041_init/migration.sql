-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "advantages" TEXT NOT NULL,
    "flaws" TEXT NOT NULL,
    "reviewAuthorId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
