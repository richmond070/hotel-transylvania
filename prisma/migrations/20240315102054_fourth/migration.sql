/*
  Warnings:

  - You are about to drop the column `firstName` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Staff` table. All the data in the column will be lost.
  - Changed the type of `paymentStatus` on the `Billing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `active` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `reservationStatus` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `fullName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReserveStatus" AS ENUM ('confirmed', 'canceled');

-- CreateEnum
CREATE TYPE "payment" AS ENUM ('paid', 'notPaid');

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "payment" NOT NULL;

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "reservationStatus",
ADD COLUMN     "reservationStatus" "ReserveStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" TEXT NOT NULL;
