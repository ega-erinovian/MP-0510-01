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
exports.getVouchersService = void 0;
const prisma_1 = require("../../lib/prisma");
const getVouchersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, sortBy, sortOrder, take, search, eventId, userId, isUsed } = query;
        const parsedEventId = eventId && Number(eventId);
        const whereClause = {};
        if (parsedEventId) {
            whereClause.eventId = parsedEventId;
        }
        if (isUsed) {
            whereClause.isUsed = isUsed;
        }
        if (search) {
            whereClause.OR = [
                { code: { equals: search } },
                { event: { title: { contains: search } } },
            ];
        }
        if (userId) {
            whereClause.event = {
                userId: userId,
            };
        }
        const vouchers = yield prisma_1.prisma.voucher.findMany({
            where: whereClause,
            skip: (page - 1) * take, // offset
            take: take, // limit
            orderBy: {
                [sortBy]: sortOrder,
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
        const count = yield prisma_1.prisma.voucher.count({
            where: whereClause,
        });
        return { data: vouchers, meta: { page, take, total: count } };
    }
    catch (error) {
        throw error;
    }
});
exports.getVouchersService = getVouchersService;
