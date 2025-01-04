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
exports.getTransactionIncomePerMonthService = void 0;
const prisma_1 = require("../../lib/prisma");
const getTransactionIncomePerMonthService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, userId } = query;
        const now = new Date();
        const startDate = new Date(now.getFullYear(), 0, 1);
        const endDate = new Date(now.getFullYear() + 1, 0, 1);
        const whereClause = {
            isDeleted: false,
            createdAt: {
                gte: startDate,
                lt: endDate,
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
        const transactions = yield prisma_1.prisma.transaction.groupBy({
            by: ["createdAt"],
            where: whereClause,
            _sum: {
                totalPrice: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        const monthlyChart = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(0, index).toLocaleString("default", { month: "long" }),
            value: 0,
        }));
        transactions.forEach((transaction) => {
            const monthIndex = transaction.createdAt.getMonth();
            monthlyChart[monthIndex].value += transaction._sum.totalPrice || 0;
        });
        return monthlyChart;
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionIncomePerMonthService = getTransactionIncomePerMonthService;
