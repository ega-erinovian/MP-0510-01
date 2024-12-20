import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateUpdateUser = [
  body("fullName").optional().isString().withMessage("Name must be a string"),
  body("email").optional().isEmail().withMessage("Email must be a valid email"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string"),
  body("phoneNumber").optional(),
  body("cityId").optional().isNumeric().withMessage("City ID must be a number"),
  body("point").optional().isNumeric().withMessage("Point must be a number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
