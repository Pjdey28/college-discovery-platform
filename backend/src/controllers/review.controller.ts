import { Request, Response }
from "express";

import prisma
from "../config/db";

export const addReview =
async (
 req: Request,
 res: Response
)=>{

 const {
  rating,
  comment,
  collegeId
 } = req.body;

 const review =
 await prisma.review.create({

  data:{
   rating,
   comment,
   userId:"demo-user",
   collegeId
  }
 });

 res.json(review);
};
export const getReviews =
async (
 req: Request,
 res: Response
)=>{

 const reviews =
 await prisma.review.findMany({

  where:{
   collegeId:
   req.params.id as string
  },

  orderBy:{
   createdAt:"desc"
  }
 });

 res.json(reviews);
};