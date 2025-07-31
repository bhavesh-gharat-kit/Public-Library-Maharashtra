-- AlterTable
ALTER TABLE `books` ADD COLUMN `bookType` ENUM('eBook', 'iBook') NOT NULL DEFAULT 'eBook',
    MODIFY `yearOfPublication` INTEGER NULL,
    MODIFY `publisher` VARCHAR(191) NULL,
    MODIFY `author` VARCHAR(191) NULL,
    MODIFY `medium` VARCHAR(191) NULL,
    MODIFY `issn` VARCHAR(191) NULL,
    MODIFY `syllabus` VARCHAR(191) NULL,
    MODIFY `subject` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL;
