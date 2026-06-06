import { Router }
from "express";

import {
  saveCollege,
  getSavedColleges
}
from "../controllers/saved.controller";

import {
  protect
}
from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  saveCollege
);

router.get(
  "/",
  protect,
  getSavedColleges
);

export default router;