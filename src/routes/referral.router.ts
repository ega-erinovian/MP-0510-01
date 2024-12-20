import { Router } from "express";
import {
  createReferralController,
  getReferralsController,
} from "../controllers/referral.controller";
import { validateCreateReferral } from "../validators/referral.validator";

const router = Router();

router.get("/", getReferralsController);
router.post("/", validateCreateReferral, createReferralController);

export default router;
