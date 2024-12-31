import { Router } from "express";
import {
  forgotPasswordController,
  checkOldPasswordController,
  registerController,
  resetPasswordController,
  loginController,
} from "../controllers/auth.controller";
import { fileFilter } from "../lib/fileFilter";
import { verifyToken, verifyTokenReset } from "../lib/jwt";
import { uploader } from "../lib/multer";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "../validators/auth.validator";

const router = Router();

router.post(
  "/register",
  uploader().fields([{ name: "profilePicture", maxCount: 1 }]),
  fileFilter,
  validateRegister,
  registerController
);
router.post("/login", validateLogin, loginController);
router.post(
  "/forgot-password",
  validateForgotPassword,
  forgotPasswordController
);
router.post(
  "/check-password",
  verifyToken,
  validateResetPassword,
  checkOldPasswordController
);
router.patch(
  "/reset-password",
  verifyTokenReset,
  validateResetPassword,
  resetPasswordController
);

export default router;
