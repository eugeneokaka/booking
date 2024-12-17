/*
  Warnings:

  - Added the required column `deperturetime` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traveltime` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `deperturetime` DATETIME(3) NOT NULL,
    ADD COLUMN `traveltime` DATETIME(3) NOT NULL;
