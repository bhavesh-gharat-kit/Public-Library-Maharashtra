-- DropForeignKey
ALTER TABLE `allowed_ip_addresses` DROP FOREIGN KEY `allowed_ip_addresses_libraryId_fkey`;

-- DropForeignKey
ALTER TABLE `i_books` DROP FOREIGN KEY `i_books_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `library_settings` DROP FOREIGN KEY `library_settings_libraryId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests` DROP FOREIGN KEY `mock_tests_examCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests_answers` DROP FOREIGN KEY `mock_tests_answers_optionId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests_answers` DROP FOREIGN KEY `mock_tests_answers_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests_options` DROP FOREIGN KEY `mock_tests_options_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `mock_tests_questions` DROP FOREIGN KEY `mock_tests_questions_mockTestId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_libraryId_fkey`;

-- DropIndex
DROP INDEX `allowed_ip_addresses_libraryId_fkey` ON `allowed_ip_addresses`;

-- DropIndex
DROP INDEX `mock_tests_examCategoryId_fkey` ON `mock_tests`;

-- DropIndex
DROP INDEX `mock_tests_answers_optionId_fkey` ON `mock_tests_answers`;

-- DropIndex
DROP INDEX `mock_tests_options_questionId_fkey` ON `mock_tests_options`;

-- DropIndex
DROP INDEX `mock_tests_questions_mockTestId_fkey` ON `mock_tests_questions`;

-- DropIndex
DROP INDEX `users_libraryId_fkey` ON `users`;

-- AddForeignKey
ALTER TABLE `library_settings` ADD CONSTRAINT `library_settings_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `i_books` ADD CONSTRAINT `i_books_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests` ADD CONSTRAINT `mock_tests_examCategoryId_fkey` FOREIGN KEY (`examCategoryId`) REFERENCES `exam_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_questions` ADD CONSTRAINT `mock_tests_questions_mockTestId_fkey` FOREIGN KEY (`mockTestId`) REFERENCES `mock_tests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_options` ADD CONSTRAINT `mock_tests_options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `mock_tests_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_answers` ADD CONSTRAINT `mock_tests_answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `mock_tests_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_answers` ADD CONSTRAINT `mock_tests_answers_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `mock_tests_options`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allowed_ip_addresses` ADD CONSTRAINT `allowed_ip_addresses_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
