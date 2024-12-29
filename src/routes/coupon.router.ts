import { Router } from "express";
import {
  createCouponController,
  getCouponsController,
} from "../controllers/coupon.controller";
import { validateCreateCoupon } from "../validators/coupon.validator";

const router = Router();

router.get("/", getCouponsController);
router.post("/", validateCreateCoupon, createCouponController);

export default router;
