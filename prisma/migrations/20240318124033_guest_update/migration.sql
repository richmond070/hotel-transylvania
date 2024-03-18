/*
  Warnings:

  - Added the required column `CONCAT(firstName, ' ', lastName)` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "CONCAT(firstName, ' ', lastName)" TEXT NOT NULL;
