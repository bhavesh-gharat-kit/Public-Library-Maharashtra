/*
  Warnings:

  - You are about to drop the `allowedip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `allowedip`;

-- DropTable
DROP TABLE `setting`;

-- CreateTable
CREATE TABLE `library_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libraryId` INTEGER UNSIGNED NOT NULL,
    `remoteAccess` BOOLEAN NOT NULL DEFAULT true,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `allowed_ip_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libraryId` INTEGER UNSIGNED NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `allowed_ip_addresses_ipAddress_key`(`ipAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `library_settings` ADD CONSTRAINT `library_settings_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allowed_ip_addresses` ADD CONSTRAINT `allowed_ip_addresses_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
