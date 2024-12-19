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
exports.getAttendeesService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAttendeesService = (transactionId, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, sortBy, sortOrder, take } = query;
        const whereClause = {
            isDeleted: false,
            transactions: { some: { status: "DONE", id: transactionId } },
        };
        const attendeList = yield prisma_1.prisma.user.findMany({
            where: whereClause,
            skip: (page - 1) * take, // offset
            take: take, // limit
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: {
                transactions: {
                    select: {
                        qty: true,
                    },
                },
            },
        });
        const count = yield prisma_1.prisma.user.count({
            where: whereClause,
        });
        return { data: attendeList, meta: { page, take, total: count } };
    }
    catch (error) {
        throw error;
    }
});
exports.getAttendeesService = getAttendeesService;
