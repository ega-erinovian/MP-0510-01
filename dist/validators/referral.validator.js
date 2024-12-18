"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateReferral = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateReferral = [
    (0, express_validator_1.body)("code").notEmpty().withMessage("Code is required"),
    (0, express_validator_1.body)("referrerUserId").notEmpty().withMessage("Referrer ID is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
