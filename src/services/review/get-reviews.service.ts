import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetReviewsQuery extends PaginationQueryParams {
  userId?: number;
}

export const getReviewsService = async (query: GetReviewsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, userId } = query;

    const whereClause: Prisma.ReviewWhereInput = {};

    if (userId) {
      whereClause.userId = userId;
    }

    const reviews = await prisma.review.findMany({
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

    const count = await prisma.review.count({
      where: whereClause,
    });

    return { data: reviews, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
