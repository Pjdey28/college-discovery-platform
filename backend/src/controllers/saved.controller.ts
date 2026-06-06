import { Response }
from "express";

import prisma
from "../config/db";

import { AuthRequest }
from "../middleware/auth.middleware";

export const saveCollege =
async (
  req: AuthRequest,
  res: Response
) => {

  const { collegeId } =
    req.body;

  const save =
    await prisma.savedCollege.create({
      data:{
        userId:
          req.userId!,

        collegeId
      }
    });

  res.json(save);
};
export const getSavedColleges =
async (
  req: AuthRequest,
  res: Response
) => {

  const colleges =
    await prisma.savedCollege.findMany({
      where:{
        userId:
          req.userId
      },

      include:{
        college:true
      }
    });

  res.json(colleges);
};