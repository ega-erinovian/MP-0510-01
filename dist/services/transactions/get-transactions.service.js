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
exports.getTransactionsService = void 0;
const prisma_1 = require("../../lib/prisma");
const getTransactionsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, sortBy, sortOrder, take, search, status, eventId, userId, customerId, } = query;
        const whereClause = {
            isDeleted: false,
        };
        if (eventId) {
            whereClause.eventId = eventId;
        }
        if (status) {
            whereClause.status = status;
        }
        if (search) {
            whereClause.OR = [
                { user: { fullName: { contains: search, mode: "insensitive" } } },
                { event: { title: { contains: search, mode: "insensitive" } } },
            ];
        }
        if (userId) {
            whereClause.event = {
                userId: userId,
            };
        }
        if (customerId) {
            whereClause.userId = customerId;
        }
        const transactions = yield prisma_1.prisma.transaction.findMany({
            where: whereClause,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        email: true,
                        phoneNumber: true,
                    },
                },
                event: {
                    select: {
                        title: true,
                        price: true,
                        address: true,
                        city: {
                            select: {
                                name: true,
                            },
                        },
                        availableSeats: true,
                        userId: true,
                    },
                },
            },
        });
        const count = yield prisma_1.prisma.transaction.count({
            where: whereClause,
        });
        return {
            data: transactions,
            meta: {
                page,
                take,
                total: count,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getTransactionsService = getTransactionsService;
