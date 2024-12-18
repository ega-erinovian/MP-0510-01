"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCitiesByCountryController = exports.getCitiesController = void 0;
const get_cities_service_1 = require("../services/city/get-cities.service");
const get_cities_by_country_service_1 = require("../services/city/get-cities-by-country.service");
const getCitiesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, get_cities_service_1.getCitiesService)();
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getCitiesController = getCitiesController;
const getCitiesByCountryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = req.query.country;
        const result = yield (0, get_cities_by_country_service_1.getCitiesByCountryService)(country);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getCitiesByCountryController = getCitiesByCountryController;
