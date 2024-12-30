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
const prisma_1 = require("../../lib/prisma");
const cloudinary_1 = require("../../lib/cloudinary");
const createTransactionService = (body, paymentProof) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let secure_url = null;
        if (paymentProof) {
            secure_url = (yield (0, cloudinary_1.cloudinaryUpload)(paymentProof)).secure_url;
        }
        return yield prisma_1.prisma.transaction.create({
            data: {
                status: body.status,
                qty: Number(body.qty),
                totalPrice: Number(body.totalPrice),
                userId: Number(body.userId),
                eventId: Number(body.eventId),
                paymentProof: secure_url,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createTransactionService = createTransactionService;
