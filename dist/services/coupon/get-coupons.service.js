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
exports.getCouponsService = void 0;
const prisma_1 = require("../../lib/prisma");
const getCouponsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, search, isUsed } = query;
        const whereClause = {
            isUsed: "AVAILABLE",
        };
        if (userId) {
            whereClause.userId = userId;
        }
        if (isUsed) {
            whereClause.isUsed = isUsed;
        }
        if (search) {
            whereClause.OR = [{ code: { equals: search } }];
        }
        const coupons = yield prisma_1.prisma.coupon.findMany({
            where: whereClause,
        });
        return { data: coupons };
    }
    catch (error) {
        throw error;
    }
});
exports.getCouponsService = getCouponsService;
