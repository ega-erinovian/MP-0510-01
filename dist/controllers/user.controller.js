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
exports.deleteUserController = exports.getUserController = exports.updateUserController = exports.checkReferralController = void 0;
const check_referral_service_1 = require("../services/user/check-referral.service");
const update_user_service_1 = require("../services/user/update-user.service");
const get_user_service_1 = require("../services/user/get-user.service");
const delete_user_service_1 = require("../services/user/delete-user.service");
const checkReferralController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.referralCode;
        const result = yield (0, check_referral_service_1.checkReferralService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.checkReferralController = checkReferralController;
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const files = req.files;
        const profilePicture = (_a = files === null || files === void 0 ? void 0 : files.profilePicture) === null || _a === void 0 ? void 0 : _a[0];
        const result = yield (0, update_user_service_1.updateUserService)(req.body, Number(id), profilePicture);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserController = updateUserController;
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, get_user_service_1.getUserService)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserController = getUserController;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, delete_user_service_1.deleteUserService)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
