import { Router } from "express";

import {
  login,
  register,
} from "../controllers/auth.controller";
import { protect }
from "../middleware/auth.middleware";

import { me }
from "../controllers/auth.controller";
const router = Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  protect,
  me
);

export default router;