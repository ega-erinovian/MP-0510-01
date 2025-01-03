import { Router } from "express";
import {
  createCouponController,
  getCouponController,
  getCouponsController,
  updateCouponController,
} from "../controllers/coupon.controller";
import {
  validateCreateCoupon,
  validateUpdateCoupon,
} from "../validators/coupon.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getCouponsController);
router.get("/:id", getCouponController);
router.post("/", validateCreateCoupon, createCouponController);
router.patch("/:id", verifyToken, validateUpdateCoupon, updateCouponController);

export default router;
