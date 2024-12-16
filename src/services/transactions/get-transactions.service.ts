import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetTransactionsQuery extends PaginationQueryParams {
  search?: string;
}

export const getTransactionsService = async (query: GetTransactionsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;

    const whereClause: Prisma.TransactionWhereInput = {};

    if (search) {
      whereClause.OR = [
        { user: { fullName: { contains: search, mode: "insensitive" } } },
        { event: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    const transactions = await prisma.transaction.findMany({
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
            price: true,
            availableSeats: true,
            userId: true,
          },
        },
      },
    });

    const count = await prisma.transaction.count({
      where: whereClause,
    });

    return { data: transactions, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
