"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateVoucher = exports.validateCreateVoucher = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateVoucher = [
    (0, express_validator_1.body)("eventId").notEmpty().withMessage("Event is required"),
    (0, express_validator_1.body)("code")
        .notEmpty()
        .withMessage("Code is required")
        .isString()
        .isLength({ min: 4 })
        .withMessage("Code must be at least 4 characters long"),
    (0, express_validator_1.body)("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isNumeric()
        .withMessage("Amount must be a number"),
    (0, express_validator_1.body)("expiresAt").notEmpty().withMessage("Expired Date is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
exports.validateUpdateVoucher = [
    (0, express_validator_1.body)("eventId").optional(),
    (0, express_validator_1.body)("code")
        .optional()
        .isString()
        .isLength({ min: 4 })
        .withMessage("Code must be at least 4 characters long"),
    (0, express_validator_1.body)("amount").optional().isNumeric().withMessage("Amount must be a number"),
    (0, express_validator_1.body)("expiresAt").optional(),
    (0, express_validator_1.body)("isUsed").optional(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
