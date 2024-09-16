/*
  Warnings:

  - Added the required column `id` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Reports_name_key` ON `reports`;

-- AlterTable
ALTER TABLE `reports` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
