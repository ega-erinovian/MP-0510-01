"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateUpdateUser = [
    (0, express_validator_1.body)("fullName").optional().isString().withMessage("Name must be a string"),
    (0, express_validator_1.body)("email").optional().isEmail().withMessage("Email must be a valid email"),
    (0, express_validator_1.body)("password")
        .optional()
        .isString()
        .withMessage("Password must be a string"),
    (0, express_validator_1.body)("phoneNumber").optional(),
    (0, express_validator_1.body)("cityId").optional().isNumeric().withMessage("City ID must be a number"),
    (0, express_validator_1.body)("point").optional().isNumeric().withMessage("Point must be a number"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
