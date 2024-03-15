/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `hireDate` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `userName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "contactNumber",
DROP COLUMN "email",
DROP COLUMN "hireDate",
DROP COLUMN "salary",
ADD COLUMN     "userName" TEXT NOT NULL;
