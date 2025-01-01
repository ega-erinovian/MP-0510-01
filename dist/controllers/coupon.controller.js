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
exports.updateCouponController = exports.createCouponController = exports.getCouponController = exports.getCouponsController = void 0;
const create_coupon_service_1 = require("../services/coupon/create-coupon.service");
const get_coupons_service_1 = require("../services/coupon/get-coupons.service");
const update_coupon_service_1 = require("../services/coupon/update-coupon.service");
const get_coupon_service_1 = require("../services/coupon/get-coupon.service");
const getCouponsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            search: req.query.search || "",
            userId: parseInt(req.query.userId) || 0,
        };
        const result = yield (0, get_coupons_service_1.getCouponsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getCouponsController = getCouponsController;
const getCouponController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, get_coupon_service_1.getCouponService)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getCouponController = getCouponController;
const createCouponController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, create_coupon_service_1.createCouponService)(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createCouponController = createCouponController;
const updateCouponController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, update_coupon_service_1.updateCouponService)(req.body, parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCouponController = updateCouponController;
