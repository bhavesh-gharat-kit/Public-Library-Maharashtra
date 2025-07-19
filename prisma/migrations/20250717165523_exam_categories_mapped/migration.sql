/*
  Warnings:

  - You are about to drop the `examcategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `explanation` to the `mock_tests_answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mock_tests` DROP FOREIGN KEY `mock_tests_examCategoryId_fkey`;

-- DropIndex
DROP INDEX `mock_tests_examCategoryId_fkey` ON `mock_tests`;

-- AlterTable
ALTER TABLE `books` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `mock_tests_answers` ADD COLUMN `explanation` TEXT NOT NULL;

-- DropTable
DROP TABLE `examcategory`;

-- CreateTable
CREATE TABLE `exam_categories` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `exam_categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mock_tests` ADD CONSTRAINT `mock_tests_examCategoryId_fkey` FOREIGN KEY (`examCategoryId`) REFERENCES `exam_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
