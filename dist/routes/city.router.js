"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_controller_1 = require("../controllers/city.controller");
const router = (0, express_1.Router)();
router.get("/", city_controller_1.getCitiesController);
router.get("/filter/country", city_controller_1.getCitiesByCountryController);
exports.default = router;
