import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/auth.controller";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
} from "../validators/auth.validator";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";

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

export default router;
