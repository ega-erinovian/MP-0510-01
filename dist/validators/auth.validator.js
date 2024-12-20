"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = exports.validateForgotPassword = exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegister = [
    (0, express_validator_1.body)("fullName").notEmpty().withMessage("Name is required").isString(),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required").isEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("referralCode").optional(),
    (0, express_validator_1.body)("phoneNumber").notEmpty().withMessage("Phone Number is required"),
    (0, express_validator_1.body)("role").notEmpty().withMessage("Role is required"),
    (0, express_validator_1.body)("cityId")
        .notEmpty()
        .withMessage("City is required")
        .isInt()
        .withMessage("City ID must be an integer"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
exports.validateLogin = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required").isEmail(),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
exports.validateForgotPassword = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required").isEmail(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
exports.validateResetPassword = [
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
