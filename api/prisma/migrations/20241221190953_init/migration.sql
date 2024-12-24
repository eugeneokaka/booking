/*
  Warnings:

  - Added the required column `date` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bus` ADD COLUMN `date` VARCHAR(191) NOT NULL;
