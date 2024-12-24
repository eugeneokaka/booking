/*
  Warnings:

  - Added the required column `deperturetime` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bus` ADD COLUMN `deperturetime` DATETIME(3) NOT NULL;
