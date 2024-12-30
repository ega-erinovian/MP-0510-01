import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateCreateEvent = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("availableSeats")
    .notEmpty()
    .withMessage("Available seats is required")
    .isNumeric()
    .withMessage("Available seats must be a number"),
  body("startDate").notEmpty().withMessage("Start Date is required"),
  body("endDate").notEmpty().withMessage("End Date is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("categoryId").notEmpty().withMessage("Category is required"),
  body("cityId").notEmpty().withMessage("City is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ message: errors.array()[0].msg });
      return;
    }

    next();
  },
];
