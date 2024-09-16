-- CreateTable
CREATE TABLE `Reports` (
    `name` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Reports_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
