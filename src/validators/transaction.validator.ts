import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Status } from "@prisma/client";

export const validateCreateTransaction = [
  body("eventId").notEmpty().withMessage("Event ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
  body("status").notEmpty().withMessage("Status is required"),
  body("qty")
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("totalPrice")
    .notEmpty()
    .withMessage("Total Price is required")
    .isNumeric()
    .withMessage("Total Price must be a number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];

export const validateUpdateTransaction = [
  body("status")
    .optional()
    .withMessage("Status is required")
    .isString()
    .withMessage("Status must be a string")
    .custom((value) => {
      if (!Object.values(Status).includes(value as Status)) {
        throw new Error("Invalid status value");
      }
      return true;
    }),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
