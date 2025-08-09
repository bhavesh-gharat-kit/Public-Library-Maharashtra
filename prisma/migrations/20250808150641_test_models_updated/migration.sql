/*
  Warnings:

  - You are about to drop the column `explanation` on the `mock_tests_questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mock_tests` MODIFY `testType` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL DEFAULT 'DAILY';

-- AlterTable
ALTER TABLE `mock_tests_questions` DROP COLUMN `explanation`;
