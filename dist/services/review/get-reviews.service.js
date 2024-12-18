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
exports.getReviewsService = void 0;
const prisma_1 = require("../../lib/prisma");
const getReviewsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, sortBy, sortOrder, take, userId } = query;
        const whereClause = {};
        if (userId) {
            whereClause.userId = userId;
        }
        const reviews = yield prisma_1.prisma.review.findMany({
            where: whereClause,
            skip: (page - 1) * take, // offset
            take: take, // limit
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
                        category: true,
                        userId: true,
                    },
                },
            },
        });
        const count = yield prisma_1.prisma.review.count({
            where: whereClause,
        });
        return { data: reviews, meta: { page, take, total: count } };
    }
    catch (error) {
        throw error;
    }
});
exports.getReviewsService = getReviewsService;
