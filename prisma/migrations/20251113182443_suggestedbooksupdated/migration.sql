/*
  Warnings:

  - You are about to drop the column `content` on the `suggested_books` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `suggested_books` table. All the data in the column will be lost.
  - Added the required column `examCategoryId` to the `suggested_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `suggested_books` DROP COLUMN `content`,
    DROP COLUMN `description`,
    ADD COLUMN `examCategoryId` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `price` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `suggested_books` ADD CONSTRAINT `suggested_books_examCategoryId_fkey` FOREIGN KEY (`examCategoryId`) REFERENCES `exam_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
