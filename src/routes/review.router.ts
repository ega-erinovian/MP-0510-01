import { Router } from "express";
import { getReviewsController } from "../controllers/reviews.controller";

const router = Router();

router.get("/", getReviewsController);

export default router;
