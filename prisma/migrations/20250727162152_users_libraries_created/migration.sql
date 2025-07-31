/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `libraryId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `libraryId` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('user', 'admin', 'superadmin') NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `libraries` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `libraries_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_userId_key` ON `users`(`userId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_libraryId_fkey` FOREIGN KEY (`libraryId`) REFERENCES `libraries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
