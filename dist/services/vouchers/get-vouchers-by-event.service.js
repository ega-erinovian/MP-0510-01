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
exports.getVouchersByEventService = void 0;
const prisma_1 = require("../../lib/prisma");
const getVouchersByEventService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vouchers = prisma_1.prisma.voucher.findMany({
            where: {
                event: {
                    id,
                },
            },
            include: {
                event: {
                    select: {
                        id: true,
                        title: true,
                        category: true,
                        price: true,
                        availableSeats: true,
                        userId: true,
                    },
                },
            },
        });
        return vouchers;
    }
    catch (error) {
        throw error;
    }
});
exports.getVouchersByEventService = getVouchersByEventService;
