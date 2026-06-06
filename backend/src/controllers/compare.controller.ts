import { Request, Response }
from "express";

import prisma
from "../config/db";

export const compareColleges =
async (
  req: Request,
  res: Response
) => {

  const { ids } = req.body;

  const colleges =
    await prisma.college.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

  res.json(colleges);
};