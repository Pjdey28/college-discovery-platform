/*
  Warnings:

  - Added the required column `placementRate` to the `Placement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Placement" ADD COLUMN     "placementRate" DOUBLE PRECISION NOT NULL;
