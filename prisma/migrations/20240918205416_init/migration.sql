/*
  Warnings:

  - Added the required column `type` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reports` ADD COLUMN `type` VARCHAR(191) NOT NULL;
