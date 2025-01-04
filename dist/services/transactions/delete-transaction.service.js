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
exports.deleteTransactionService = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteTransactionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield prisma_1.prisma.transaction.findFirst({
            where: { id },
        });
        if (!transaction) {
            throw new Error("Transaction not found.");
        }
        yield prisma_1.prisma.transaction.update({
            where: { id },
            data: { isDeleted: true },
        });
        return { message: "Transaction deleted successfully." };
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTransactionService = deleteTransactionService;
