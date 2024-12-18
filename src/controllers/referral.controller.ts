import { NextFunction, Request, Response } from "express";
import { createReferralService } from "../services/referral/create-referral.service";

export const createReferralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createReferralService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
