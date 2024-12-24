import { Router } from "express";
import {
  checkReferralController,
  getUserController,
  updateUserController,
} from "../controllers/user.controller";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";
import { updateUserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", checkReferralController);
router.get("/:id", getUserController);
router.patch(
  "/:id",
  uploader().fields([{ name: "profilePicture", maxCount: 1 }]),
  fileFilter,
  updateUserController
);

export default router;
