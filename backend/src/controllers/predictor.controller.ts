import { Request, Response } from "express";
import prisma from "../config/db";

export const predictCollege =
async (
  req: Request,
  res: Response
) => {

  try {

    const {
      rank,
      exam,
    } = req.body;

    const colleges =
      await prisma.cutoff.findMany({

        where:{
          exam,

          rank:{
            gte:Number(rank)
          }
        },

        include:{
          college:true
        },

        orderBy:{
          rank:"asc"
        },

        take:10
      });

    res.json(colleges);

  } catch(error){

    res.status(500).json({
      message:"Prediction failed"
    });

  }
};