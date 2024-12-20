import { Router } from "express";
import {
  checkReferralController,
  updateUserController,
} from "../controllers/user.controller";
import { validateUpdateUser } from "../validators/user.validator";

const router = Router();

router.get("/", checkReferralController);
router.patch("/:id", validateUpdateUser, updateUserController);

export default router;
