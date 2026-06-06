import { Request, Response }
from "express";

import prisma
from "../config/db";

export const createDiscussion =
async (
  req: Request & { userId?: string },
  res: Response
) => {

  const {
    title,
    content,
  } = req.body;

  const discussion =
    await prisma.discussion.create({
      data:{
        title,
        content,
        userId: req.userId!
      }
    });

  res.json(discussion);
};

export const getDiscussions =
async (
  req: Request,
  res: Response
) => {

  const discussions =
    await prisma.discussion.findMany({

      include:{
        answers:true
      },

      orderBy:{
        createdAt:"desc"
      }
    });

  res.json(discussions);
};

export const addAnswer =
async (
  req: Request,
  res: Response
) => {

  const {
    content
  } = req.body;

  const answer =
    await prisma.answer.create({

      data:{
        content,

        discussionId: req.params.id as string
      }
    });

  res.json(answer);
};