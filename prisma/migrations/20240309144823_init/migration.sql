/*
  Warnings:

  - You are about to drop the column `name` on the `ReviewerBot` table. All the data in the column will be lost.
  - Added the required column `botName` to the `ReviewerBot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReviewerBot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "botName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answerRule" TEXT NOT NULL,
    CONSTRAINT "ReviewerBot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReviewerBot" ("answerRule", "id", "userId") SELECT "answerRule", "id", "userId" FROM "ReviewerBot";
DROP TABLE "ReviewerBot";
ALTER TABLE "new_ReviewerBot" RENAME TO "ReviewerBot";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
