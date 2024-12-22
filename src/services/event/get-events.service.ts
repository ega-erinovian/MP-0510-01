import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetEventQuery extends PaginationQueryParams {
  search?: string;
  userId?: number;
  categoryId?: number;
}

export const getEventsService = async (query: GetEventQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search, categoryId, userId } = query;

    const parsedCategoryId = categoryId && Number(categoryId);

    const whereClause: Prisma.EventWhereInput = {};

    if (parsedCategoryId) {
      whereClause.categoryId = parsedCategoryId; // Use parsed value
    }

    if (userId) {
      whereClause.userId = userId;
    }

    if (search) {
      whereClause.OR = [{ title: { contains: search, mode: "insensitive" } }];
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      skip: (page - 1) * take, // offset
      take: take, // limit
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
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
      },
    });

    const count = await prisma.event.count({
      where: whereClause,
    });

    return { data: events, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
