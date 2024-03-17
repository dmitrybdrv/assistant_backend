/*
  Warnings:

  - You are about to drop the `ReviewrBot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReviewrBot";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ReviewerBot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    "answer" TEXT NOT NULL,
    CONSTRAINT "ReviewerBot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
