"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_controller_1 = require("../controllers/reviews.controller");
const router = (0, express_1.Router)();
router.get("/", reviews_controller_1.getReviewsController);
exports.default = router;
