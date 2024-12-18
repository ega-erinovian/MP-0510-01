import { Router } from "express";
import { createReferralController } from "../controllers/referral.controller";
import { validateCreateReferral } from "../validators/referral.validator";

const router = Router();

router.post("/", validateCreateReferral, createReferralController);

export default router;
