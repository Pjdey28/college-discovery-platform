import { Router }
from "express";

import {
 addReview,
 getReviews
}
from "../controllers/review.controller";

const router = Router();

router.post(
 "/",
 addReview
);

router.get(
 "/:id",
 getReviews
);

export default router;