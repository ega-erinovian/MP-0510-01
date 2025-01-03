import { Router } from "express";
import {
  checkReferralController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/user.controller";
import { fileFilter } from "../lib/fileFilter";
import { verifyToken } from "../lib/jwt";
import { uploader } from "../lib/multer";

const router = Router();

router.get("/", checkReferralController);
router.get("/:id", getUserController);
router.patch(
  "/:id",
  uploader().fields([{ name: "profilePicture", maxCount: 1 }]),
  fileFilter,
  updateUserController
);
router.delete("/:id", deleteUserController);

export default router;
