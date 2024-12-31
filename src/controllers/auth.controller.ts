import { NextFunction, Request, Response } from "express";
import { forgotPasswordService } from "../services/auth/forgot-password.service";
import { loginService } from "../services/auth/login.service";
import { registerService } from "../services/auth/register.service";
import { resetPasswordService } from "../services/auth/reset-password.service";
import { checkOldPasswordService } from "../services/auth/check-old-password.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const result = await registerService(req.body, files.profilePicture?.[0]);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const checkOldPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await checkOldPasswordService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await forgotPasswordService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(res.locals.user.id);
    const result = await resetPasswordService(userId, req.body.password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
