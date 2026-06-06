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
        where:{

  name:{
    contains:
    search as string,

    mode:
    "insensitive"
  },

  state:
  state
  ? String(state)
  : undefined,

  fees:{

    gte:
    req.query.minFees
    ? Number(
      req.query.minFees
    )
    : undefined,

    lte:
    req.query.maxFees
    ? Number(
      req.query.maxFees
    )
    : undefined
  },

  rating:{

    gte:
    req.query.rating
    ? Number(
      req.query.rating
    )
    : undefined
  }
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
        cutoffs:true
      },
    });

  if (!college) {
    return res.status(404).json({
      message: "College not found",
    });
  }

  res.json(college);
};
export const getTrendingColleges =
async (
  req: Request,
  res: Response
) => {

  const colleges =
    await prisma.college.findMany({

      orderBy:{
        rating:"desc"
      },

      take:6
    });

  res.json(colleges);
};