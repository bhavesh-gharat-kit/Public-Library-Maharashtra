-- AlterTable
ALTER TABLE `books` ADD COLUMN `pdfLink` VARCHAR(191) NULL,
    ADD COLUMN `standard` VARCHAR(191) NULL,
    ADD COLUMN `thumbnailLink` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `i_books` MODIFY `summary` TEXT NULL,
    MODIFY `notes` TEXT NULL,
    MODIFY `revisionNotes` TEXT NULL,
    MODIFY `commonMistakes` TEXT NULL,
    MODIFY `studyTricks` TEXT NULL,
    MODIFY `definitions` TEXT NULL,
    MODIFY `suggestedVideos` TEXT NULL;
