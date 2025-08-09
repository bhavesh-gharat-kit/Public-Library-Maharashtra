/*
  Warnings:

  - A unique constraint covering the columns `[libraryId]` on the table `library_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `library_settings_libraryId_key` ON `library_settings`(`libraryId`);
