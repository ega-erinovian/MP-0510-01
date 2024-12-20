import { NextFunction, Request, Response } from "express";
import { registerService } from "../services/auth/register.service";

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
