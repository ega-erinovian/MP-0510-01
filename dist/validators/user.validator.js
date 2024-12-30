"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.updateUserValidator = [
    (0, express_validator_1.body)("fullName").notEmpty().withMessage("Full Name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    (0, express_validator_1.body)("phoneNumber").notEmpty().withMessage("Phone number is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
