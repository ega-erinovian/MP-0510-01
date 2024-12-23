"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const multer_1 = require("../lib/multer");
const fileFilter_1 = require("../lib/fileFilter");
const jwt_1 = require("../lib/jwt");
const router = (0, express_1.Router)();
router.post("/register", (0, multer_1.uploader)().fields([{ name: "profilePicture", maxCount: 1 }]), fileFilter_1.fileFilter, auth_validator_1.validateRegister, auth_controller_1.registerController);
router.post("/login", auth_validator_1.validateLogin, auth_controller_1.loginController);
router.post("/forgot-password", auth_validator_1.validateForgotPassword, auth_controller_1.forgotPasswordController);
router.patch("/reset-password", jwt_1.verifyTokenReset, auth_validator_1.validateResetPassword, auth_controller_1.resetPasswordController);
exports.default = router;
