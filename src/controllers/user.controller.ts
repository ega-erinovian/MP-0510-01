import { NextFunction, Request, Response } from "express";
import { checkReferralService } from "../services/user/check-referral.service";
import { updateUserService } from "../services/user/update-user.service";

export const checkReferralController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.referralCode as string;
    const result = await checkReferralService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateUserService(req.body, parseInt(id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
