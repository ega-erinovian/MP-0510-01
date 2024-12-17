import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Status } from "@prisma/client";

export const validateUpdateTransaction = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isString()
    .withMessage("Status must be a string")
    .custom((value) => {
      if (!Object.values(Status).includes(value as Status)) {
        throw new Error("Invalid status value");
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
