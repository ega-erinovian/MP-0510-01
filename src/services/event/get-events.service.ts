import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetEventQuery extends PaginationQueryParams {
  search?: string;
  userId?: number;
  categoryId?: number;
  cityId?: number;
  timeRange?: string;
}

export const getEventsService = async (query: GetEventQuery) => {
  try {
    const {
      page = 1,
      sortBy = "id",
      sortOrder = "desc",
      take,
      search,
      categoryId,
      userId,
      cityId,
      timeRange,
    } = query;

    const parsedCategoryId = categoryId && Number(categoryId);

    const whereClause: Prisma.EventWhereInput = {
      isDeleted: false,
    };

    if (parsedCategoryId) {
      whereClause.categoryId = parsedCategoryId; // Use parsed value
    }

    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (userId) {
      whereClause.userId = userId;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { organizer: { fullName: { contains: search } } },
      ];
    }

    if (timeRange) {
      const now = new Date();
      let endDate: Date | undefined;

      switch (timeRange) {
        case "day":
          endDate = new Date(now.setHours(23, 59, 59, 999));
          break;
        case "week":
          const startOfWeek = new Date(
            now.setDate(now.getDate() - now.getDay())
          );
          endDate = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
          endDate.setHours(23, 59, 59, 999);
          break;
        case "month":
          endDate = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          );
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

    const events = await prisma.event.findMany({
      where: whereClause,
      ...(take !== -1
        ? {
            skip: (page - 1) * (take || 10), // Pagination
            take: take || 10, // Pagination
          }
        : {}),
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
            profilePicture: true,
            bankAccount: true,
          },
        },
        city: {
          select: {
            name: true,
            countryId: true,
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

    return {
      data: events,
      meta: {
        page: take !== -1 ? page : 1,
        take: take !== -1 ? take : count,
        total: count,
      },
    };
  } catch (error) {
    throw error;
  }
};
