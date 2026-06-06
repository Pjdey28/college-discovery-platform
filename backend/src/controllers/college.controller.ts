import { Request, Response } from "express";
import prisma from "../config/db";

export const getColleges =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      search,
      state,
      minFees,
      maxFees,
    } = req.query;

    const colleges =
      await prisma.college.findMany({
        where: {

          name: {
            contains:
              search as string,
            mode:
              "insensitive",
          },

          state: state
            ? String(state)
            : undefined,

          fees: {
            gte: minFees
              ? Number(minFees)
              : undefined,

            lte: maxFees
              ? Number(maxFees)
              : undefined,
          },
        },

        take: 20,
      });

    res.json(colleges);
  };
export const getCollegeById = async (
  req: Request,
  res: Response
) => {

  const { id } = req.params;

  const college =
    await prisma.college.findUnique({
      where: { id:id as string },

      include: {
        courses: true,
        reviews: true,
        placements: true,
      },
    });

  if (!college) {
    return res.status(404).json({
      message: "College not found",
    });
  }

  res.json(college);
};