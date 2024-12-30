import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateCreateVoucher = [
  body("eventId").notEmpty().withMessage("Event is required"),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .isString()
    .isLength({ min: 4 })
    .withMessage("Code must be at least 4 characters long"),
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

export const validateUpdateVoucher = [
  body("code")
    .optional()
    .isString()
    .isLength({ min: 4 })
    .withMessage("Code must be at least 4 characters long"),
  body("amount").optional().isNumeric().withMessage("Amount must be a number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
