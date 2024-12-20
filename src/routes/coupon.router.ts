import { Router } from "express";
import { createCouponController } from "../controllers/coupon.controller";
import { validateCreateCoupon } from "../validators/coupon.validator";

const router = Router();

router.post("/", validateCreateCoupon, createCouponController);

export default router;
