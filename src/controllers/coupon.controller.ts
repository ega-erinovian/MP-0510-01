import { NextFunction, Request, Response } from "express";
import { createCouponService } from "../services/coupon/create-coupon.service";

export const createCouponController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createCouponService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
