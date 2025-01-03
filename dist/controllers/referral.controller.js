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
exports.getReferralsController = exports.createReferralController = void 0;
const create_referral_service_1 = require("../services/referral/create-referral.service");
const get_referrals_service_1 = require("../services/referral/get-referrals.service");
const createReferralController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, create_referral_service_1.createReferralService)(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createReferralController = createReferralController;
const getReferralsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 10,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "id",
            sortOrder: req.query.sortOrder || "desc",
            referralCode: req.query.referralCode || "",
            userId: parseInt(req.query.userId) || 0,
        };
        const result = yield (0, get_referrals_service_1.getReferralsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getReferralsController = getReferralsController;
