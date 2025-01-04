"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTransaction = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateTransaction = [
    (0, express_validator_1.body)("eventId").notEmpty().withMessage("Event ID is required"),
    (0, express_validator_1.body)("userId").notEmpty().withMessage("User ID is required"),
    (0, express_validator_1.body)("status").notEmpty().withMessage("Status is required"),
    (0, express_validator_1.body)("qty")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .withMessage("Quantity must be a number"),
    (0, express_validator_1.body)("totalPrice")
        .notEmpty()
        .withMessage("Total Price is required")
        .isNumeric()
        .withMessage("Total Price must be a number"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ message: errors.array()[0].msg });
            return;
        }
        next();
    },
];
// export const validateUpdateTransaction = [
//   body("status")
//     .optional()
//     .withMessage("Status is required")
//     .isString()
//     .withMessage("Status must be a string")
//     .custom((value) => {
//       if (!Object.values(Status).includes(value as Status)) {
//         throw new Error("Invalid status value");
//       }
//       return true;
//     }),
//   body("email").optional().isEmail().withMessage("Invalid email format"),
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).send({ message: errors.array()[0].msg });
//       return;
//     }
//     next();
//   },
// ];
