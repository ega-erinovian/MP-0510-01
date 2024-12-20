"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../validators/user.validator");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.checkReferralController);
router.patch("/:id", user_validator_1.validateUpdateUser, user_controller_1.updateUserController);
exports.default = router;
