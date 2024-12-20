import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateCreateCoupon = [
  body("code").notEmpty().withMessage("Code is required").isString(),
  body("userId")
    .notEmpty()
    .withMessage("User ID (Owner) is required")
    .isNumeric()
    .withMessage("User ID must be a number"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("expiresAt").notEmpty().withMessage("Expired Date is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
