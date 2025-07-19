-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'superadmin', 'user') NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_inspiration` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `quote` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `yearOfPublication` INTEGER NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `medium` VARCHAR(191) NOT NULL,
    `issn` VARCHAR(191) NOT NULL,
    `syllabus` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `contentType` ENUM('openAccess', 'premium') NOT NULL DEFAULT 'openAccess',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `i_books` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER UNSIGNED NOT NULL,
    `summary` TEXT NOT NULL,
    `notes` TEXT NOT NULL,
    `revisionNotes` TEXT NOT NULL,
    `commonMistakes` TEXT NOT NULL,
    `studyTricks` TEXT NOT NULL,
    `definitions` TEXT NOT NULL,
    `suggestedVideos` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `i_books_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamCategory` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ExamCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock_tests` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `testType` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL,
    `examCategoryId` INTEGER UNSIGNED NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock_tests_questions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `question` TEXT NOT NULL,
    `explanation` TEXT NOT NULL,
    `mockTestId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock_tests_options` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `questionId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mock_tests_answers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER UNSIGNED NOT NULL,
    `optionId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `mock_tests_answers_questionId_key`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `i_books` ADD CONSTRAINT `i_books_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests` ADD CONSTRAINT `mock_tests_examCategoryId_fkey` FOREIGN KEY (`examCategoryId`) REFERENCES `ExamCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_questions` ADD CONSTRAINT `mock_tests_questions_mockTestId_fkey` FOREIGN KEY (`mockTestId`) REFERENCES `mock_tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_options` ADD CONSTRAINT `mock_tests_options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `mock_tests_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_answers` ADD CONSTRAINT `mock_tests_answers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `mock_tests_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mock_tests_answers` ADD CONSTRAINT `mock_tests_answers_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `mock_tests_options`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
