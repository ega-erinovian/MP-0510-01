"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTransaction = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
exports.validateUpdateTransaction = [
    (0, express_validator_1.body)("status")
        .notEmpty()
        .withMessage("Status is required")
        .isString()
        .withMessage("Status must be a string")
        .custom((value) => {
        if (!Object.values(client_1.Status).includes(value)) {
            throw new Error("Invalid status value");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
