/*
  Warnings:

  - Changed the type of `status` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `position` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('vacant', 'occupied', 'under_maintenace');

-- CreateEnum
CREATE TYPE "staff_position" AS ENUM ('General_manger', 'Front_desk', 'House_keeping');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "status",
ADD COLUMN     "status" "RoomStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "position",
ADD COLUMN     "position" "staff_position" NOT NULL;
