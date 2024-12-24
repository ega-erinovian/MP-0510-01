"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.updateUserValidator = [
    // Validate body fields (you can add more validation rules based on your schema)
    (0, express_validator_1.body)("fullName")
        .optional()
        .isString()
        .withMessage("Full name must be a string"),
    (0, express_validator_1.body)("email").optional().isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("phoneNumber")
        .optional()
        .isString()
        .withMessage("Phone number must be a string"),
    // Custom validation to handle errors after checking all rules
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
