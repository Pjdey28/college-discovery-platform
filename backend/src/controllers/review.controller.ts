import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/db";

export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { rating, comment, collegeId } = req.body;

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId: req.userId as string,
        collegeId,
      },
    });

    res.json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        collegeId: req.params.id as string,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    });

    res.json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};