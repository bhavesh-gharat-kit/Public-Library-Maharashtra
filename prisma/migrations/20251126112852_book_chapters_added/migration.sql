-- CreateTable
CREATE TABLE `book_chapters` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER UNSIGNED NOT NULL,
    `chapterNumber` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `summary` MEDIUMTEXT NULL,
    `chapterOverview` MEDIUMTEXT NULL,
    `keyConcepts` MEDIUMTEXT NULL,
    `commonMistakes` MEDIUMTEXT NULL,
    `detailedNotes` MEDIUMTEXT NULL,
    `commonErrors` MEDIUMTEXT NULL,
    `studyTips` MEDIUMTEXT NULL,
    `practiceQuestions` MEDIUMTEXT NULL,
    `sampleQuestionPaper` MEDIUMTEXT NULL,
    `mcqPracticeBank` MEDIUMTEXT NULL,
    `thumbnailLink` VARCHAR(191) NULL,
    `pdfLink` VARCHAR(191) NULL,
    `videoLink` VARCHAR(191) NULL,
    `audioLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_chapters` ADD CONSTRAINT `book_chapters_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
