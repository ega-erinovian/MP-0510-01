"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referral_controller_1 = require("../controllers/referral.controller");
const referral_validator_1 = require("../validators/referral.validator");
const router = (0, express_1.Router)();
router.get("/", referral_controller_1.getReferralsController);
router.post("/", referral_validator_1.validateCreateReferral, referral_controller_1.createReferralController);
exports.default = router;
