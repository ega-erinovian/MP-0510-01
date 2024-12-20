import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("fullName").notEmpty().withMessage("Name is required").isString(),
  body("email").notEmpty().withMessage("Email is required").isEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  body("referralCode").optional(),
  body("phoneNumber").notEmpty().withMessage("Phone Number is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("cityId")
    .notEmpty()
    .withMessage("City is required")
    .isInt()
    .withMessage("City ID must be an integer"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];

export const validateLogin = [
  body("email").notEmpty().withMessage("Email is required").isEmail(),
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];

export const validateForgotPassword = [
  body("email").notEmpty().withMessage("Email is required").isEmail(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];

export const validateResetPassword = [
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
