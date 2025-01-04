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
exports.getTransactionIncomeService = void 0;
const prisma_1 = require("../../lib/prisma");
const getTransactionIncomeService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timeFilter, eventId, userId } = query;
        const now = new Date();
        let startDate = new Date();
        switch (timeFilter) {
            case "day":
                startDate.setHours(0, 0, 0, 0);
                break;
            case "week":
                startDate.setDate(now.getDate() - 7);
                break;
            case "month":
                startDate.setMonth(now.getMonth() - 1);
                break;
            case "year":
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                throw new Error("Invalid time filter");
        }
        const whereClause = {
            isDeleted: false,
            createdAt: {
                gte: startDate,
                lte: now,
            },
            status: {
                equals: "DONE",
            },
        };
        if (eventId) {
            whereClause.eventId = eventId;
        }
        if (userId) {
            whereClause.event = {
                userId: userId,
            };
        }
        const result = yield prisma_1.prisma.transaction.aggregate({
            where: whereClause,
            _sum: {
                totalPrice: true,
            },
        });
        return result._sum.totalPrice || 0;
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionIncomeService = getTransactionIncomeService;
