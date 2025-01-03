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
    console.log("Running cron job to check voucher expiries");
    try {
        const availableVoucher = yield prisma_1.prisma.voucher.findMany({
            where: {
                isUsed: "AVAILABLE",
                expiresAt: {
                    equals: new Date(),
                },
            },
        });
        // Update each voucher to EXPIRED
        for (const voucher of availableVoucher) {
            yield prisma_1.prisma.voucher.update({
                where: { id: voucher.id },
                data: { isUsed: "EXPIRED" },
            });
            console.log(`Voucher ${voucher.id} updated to EXPIRED.`);
        }
        console.log(`Total expired vouchers: ${availableVoucher.length}`);
    }
    catch (error) {
        console.error("Error processing vouchers:", error);
    }
}));
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running cron job to check coupon expiries");
    try {
        const availableCoupon = yield prisma_1.prisma.coupon.findMany({
            where: {
                isUsed: "AVAILABLE",
                expiresAt: {
                    equals: new Date(),
                },
            },
        });
        // Update each voucher to EXPIRED
        for (const coupon of availableCoupon) {
            yield prisma_1.prisma.coupon.update({
                where: { id: coupon.id },
                data: { isUsed: "EXPIRED" },
            });
            console.log(`Coupon ${coupon.id} updated to EXPIRED.`);
        }
        console.log(`Total expired coupons: ${availableCoupon.length}`);
    }
    catch (error) {
        console.error("Error processing coupons:", error);
    }
}));
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running cron job to check user's point expiries");
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        threeMonthsAgo.setHours(0, 0, 0, 0);
        const existingUser = yield prisma_1.prisma.user.findMany({
            where: {
                isDeleted: false,
                point: {
                    lte: 0,
                },
                pointExpired: {
                    lte: threeMonthsAgo,
                },
            },
        });
        for (const user of existingUser) {
            yield prisma_1.prisma.user.update({
                where: { id: user.id },
                data: { point: 0 },
            });
            console.log(`User's ${user.id} point updated to 0 because it's expired.`);
        }
    }
    catch (error) {
        console.error("Error processing coupons:", error);
    }
}));
