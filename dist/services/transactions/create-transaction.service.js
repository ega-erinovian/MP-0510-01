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
exports.createTransactionService = void 0;
const cloudinary_1 = require("../../lib/cloudinary");
const prisma_1 = require("../../lib/prisma");
const createTransactionService = (body, paymentProof) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let secure_url = null;
        if (paymentProof) {
            secure_url = (yield (0, cloudinary_1.cloudinaryUpload)(paymentProof)).secure_url;
        }
        // Build transaction data object
        const transactionData = {
            status: body.status,
            qty: Number(body.qty),
            totalPrice: Number(body.totalPrice),
            userId: Number(body.userId),
            eventId: Number(body.eventId),
            paymentProof: secure_url,
            isUsePoint: typeof body.isUsePoint === "string"
                ? body.isUsePoint === "true"
                : (_a = body.isUsePoint) !== null && _a !== void 0 ? _a : false,
        };
        // Optional fields (voucher, coupon)
        if (body.voucherId !== undefined) {
            transactionData.voucherId = Number(body.voucherId);
        }
        if (body.couponId !== undefined) {
            transactionData.couponId = Number(body.couponId);
        }
        // Create the transaction
        return yield prisma_1.prisma.transaction.create({
            data: transactionData,
        });
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
});
exports.createTransactionService = createTransactionService;
