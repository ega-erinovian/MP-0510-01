"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendee_controller_1 = require("../controllers/attendee.controller");
const router = (0, express_1.Router)();
router.get("/:id", attendee_controller_1.getAttendeesController);
exports.default = router;
