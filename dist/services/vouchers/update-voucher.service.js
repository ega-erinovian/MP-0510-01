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
exports.updateVoucherService = void 0;
const prisma_1 = require("../../lib/prisma");
const updateVoucherService = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = body;
        // Find the existing voucher by ID
        const existingVoucher = yield prisma_1.prisma.voucher.findUnique({
            where: { id },
        });
        if (!existingVoucher) {
            throw new Error("Voucher not found");
        }
        // Only check for an existing voucher with the same code if it's different from the current voucher's code
        if (code && code !== existingVoucher.code) {
            const voucherWithCode = yield prisma_1.prisma.voucher.findFirst({
                where: { code },
            });
            if (voucherWithCode) {
                throw new Error("Voucher with this code already exists");
            }
        }
        // Update the voucher
        return yield prisma_1.prisma.voucher.update({
            where: { id },
            data: Object.assign({}, body),
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateVoucherService = updateVoucherService;
