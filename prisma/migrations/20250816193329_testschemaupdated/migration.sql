/*
  Warnings:

  - You are about to drop the `mock_tests_questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `mock_tests_answers` DROP FOREIGN KEY `mock_tests_answers_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests_options` DROP FOREIGN KEY `mock_tests_options_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests_questions` DROP FOREIGN KEY `mock_tests_questions_mockTestId_fkey`;

-- DropIndex
DROP INDEX `mock_tests_options_questionId_fkey` ON `mock_tests_options`;

-- DropTable
DROP TABLE `mock_tests_questions`;

-- CreateTable
CREATE TABLE `exam_category_questions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `examCategoryId` INTEGER UNSIGNED NOT NULL,
    `question` TEXT NOT NULL,
    `currentAffairsDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exam_category_questions` ADD CONSTRAINT `exam_category_questions_examCategoryId_fkey` FOREIGN KEY (`examCategoryId`) REFERENCES `exam_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_options` ADD CONSTRAINT `mock_tests_options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `exam_category_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_answers` ADD CONSTRAINT `mock_tests_answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `exam_category_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
