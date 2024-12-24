/*
  Warnings:

  - Changed the type of `traveltime` on the `ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `traveltime`,
    ADD COLUMN `traveltime` INTEGER NOT NULL;
