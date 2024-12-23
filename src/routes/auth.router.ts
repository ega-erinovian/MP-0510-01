import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
} from "../controllers/auth.controller";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
} from "../validators/auth.validator";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";
import { verifyTokenReset } from "../lib/jwt";

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
router.patch(
  "/reset-password",
  verifyTokenReset,
  validateResetPassword,
  resetPasswordController
);

export default router;
