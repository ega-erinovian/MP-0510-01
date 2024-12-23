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
const client_1 = require("@prisma/client");
const prisma_1 = require("../../lib/prisma");
const getTransactionIncomePerMonthService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, userId } = query;
        // Set the date range for the entire year
        const now = new Date();
        const startDate = new Date(now.getFullYear(), 0, 1); // January 1st of the current year
        const endDate = new Date(now.getFullYear() + 1, 0, 1); // January 1st of the next year
        const whereClause = {
            isDeleted: false,
            createdAt: {
                gte: startDate,
                lt: endDate,
            },
            status: client_1.Status.DONE,
        };
        if (eventId) {
            whereClause.eventId = eventId;
        }
        if (userId) {
            whereClause.event = {
                userId: userId,
            };
        }
        // Fetch transactions grouped by month
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
        // Initialize monthly chart with zero values
        const monthlyChart = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(0, index).toLocaleString("default", { month: "long" }),
            value: 0,
        }));
        // Sum up total prices for each month
        transactions.forEach((transaction) => {
            const monthIndex = transaction.createdAt.getMonth(); // Get month index (0-11)
            monthlyChart[monthIndex].value += transaction._sum.totalPrice || 0; // Sum totalPrice
        });
        return monthlyChart;
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionIncomePerMonthService = getTransactionIncomePerMonthService;
