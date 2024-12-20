import { Router } from "express";
import { registerController } from "../controllers/auth.controller";
import { validateRegister } from "../validators/auth.validator";
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

export default router;
