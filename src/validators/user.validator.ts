import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const updateUserValidator = [
  // Validate body fields (you can add more validation rules based on your schema)
  body("fullName")
    .optional()
    .isString()
    .withMessage("Full name must be a string"),
  body("email").optional().isEmail().withMessage("Email must be valid"),
  body("phoneNumber")
    .optional()
    .isString()
    .withMessage("Phone number must be a string"),

  // Custom validation to handle errors after checking all rules
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
