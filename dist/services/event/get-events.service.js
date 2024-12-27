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
exports.getEventsService = void 0;
const prisma_1 = require("../../lib/prisma");
const getEventsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, sortBy = "id", sortOrder = "desc", take, search, categoryId, userId, timeRange, } = query;
        const parsedCategoryId = categoryId && Number(categoryId);
        const whereClause = {
            isDeleted: false,
        };
        if (parsedCategoryId) {
            whereClause.categoryId = parsedCategoryId; // Use parsed value
        }
        if (userId) {
            whereClause.userId = userId;
        }
        if (search) {
            whereClause.OR = [{ title: { contains: search, mode: "insensitive" } }];
        }
        if (timeRange) {
            const now = new Date();
            let endDate;
            switch (timeRange) {
                case "day":
                    endDate = new Date(now.setHours(23, 59, 59, 999));
                    break;
                case "week":
                    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                    endDate = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
                    endDate.setHours(23, 59, 59, 999);
                    break;
                case "month":
                    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                    break;
                case "year":
                    endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
                    break;
                default:
                    throw new Error("Invalid timeRange value");
            }
            if (endDate) {
                whereClause.endDate = {
                    lte: endDate,
                };
            }
        }
        const events = yield prisma_1.prisma.event.findMany(Object.assign(Object.assign({ where: whereClause }, (take !== -1
            ? {
                skip: (page - 1) * (take || 10), // Pagination
                take: take || 10, // Pagination
            }
            : {})), { skip: (page - 1) * take, take: take, orderBy: {
                [sortBy]: sortOrder,
            }, include: {
                organizer: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                city: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            } }));
        const count = yield prisma_1.prisma.event.count({
            where: whereClause,
        });
        return {
            data: events,
            meta: {
                page: take !== -1 ? page : 1,
                take: take !== -1 ? take : count,
                total: count,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getEventsService = getEventsService;
