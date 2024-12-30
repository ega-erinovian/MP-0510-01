"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateEvent = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateEvent = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("price").notEmpty().withMessage("Price is required"),
    (0, express_validator_1.body)("availableSeats")
        .notEmpty()
        .withMessage("Available seats is required")
        .isNumeric()
        .withMessage("Available seats must be a number"),
    (0, express_validator_1.body)("startDate").notEmpty().withMessage("Start Date is required"),
    (0, express_validator_1.body)("endDate").notEmpty().withMessage("End Date is required"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.body)("categoryId").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("cityId").notEmpty().withMessage("City is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
