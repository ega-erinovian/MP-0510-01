import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateCreateReferral = [
  body("code").notEmpty().withMessage("Code is required"),
  body("referrerUserId").notEmpty().withMessage("Referrer ID is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
