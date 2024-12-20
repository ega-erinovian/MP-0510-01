"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coupon_controller_1 = require("../controllers/coupon.controller");
const coupon_validator_1 = require("../validators/coupon.validator");
const router = (0, express_1.Router)();
router.post("/", coupon_validator_1.validateCreateCoupon, coupon_controller_1.createCouponController);
exports.default = router;
