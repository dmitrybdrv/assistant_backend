/*
  Warnings:

  - Added the required column `type` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "Author_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Author_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Author" ("commentId", "id", "name", "questionId", "reviewId") SELECT "commentId", "id", "name", "questionId", "reviewId" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
CREATE UNIQUE INDEX "Author_commentId_key" ON "Author"("commentId");
CREATE UNIQUE INDEX "Author_reviewId_key" ON "Author"("reviewId");
CREATE UNIQUE INDEX "Author_questionId_key" ON "Author"("questionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
