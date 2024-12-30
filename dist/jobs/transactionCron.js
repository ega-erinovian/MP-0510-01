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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("../lib/prisma");
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running cron job to check unpaid transactions...");
    try {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const unpaidTransactions = yield prisma_1.prisma.transaction.findMany({
            where: {
                status: "UNPAID",
                createdAt: {
                    lte: twoHoursAgo,
                },
            },
        });
        // Update each transaction to REJECTED
        for (const transaction of unpaidTransactions) {
            yield prisma_1.prisma.transaction.update({
                where: { id: transaction.id },
                data: { status: "EXPIRED" },
            });
            console.log(`Transaction ${transaction.id} updated to EXPIRED.`);
        }
    }
    catch (error) {
        console.error("Error processing transactions:", error);
    }
}));
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running cron job to check admin to confirm payment..");
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const unpaidTransactions = yield prisma_1.prisma.transaction.findMany({
            where: {
                status: "CONFIRMING",
                createdAt: {
                    lte: yesterday,
                },
            },
        });
        // Update each transaction to REJECTED
        for (const transaction of unpaidTransactions) {
            yield prisma_1.prisma.transaction.update({
                where: { id: transaction.id },
                data: { status: "REJECTED" },
            });
            console.log(`Transaction ${transaction.id} updated to REJECTED.`);
        }
    }
    catch (error) {
        console.error("Error processing transactions:", error);
    }
}));
