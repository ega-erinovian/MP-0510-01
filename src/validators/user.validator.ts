import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const updateUserValidator = [
  body("fullName").notEmpty().withMessage("Full Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
