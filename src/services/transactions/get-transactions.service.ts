import { Prisma, Status } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetTransactionsQuery extends PaginationQueryParams {
  search?: string;
  status?: string;
  eventId?: number;
  userId?: number;
  customerId?: number;
}

export const getTransactionsService = async (query: GetTransactionsQuery) => {
  try {
    const {
      page,
      sortBy,
      sortOrder,
      take,
      search,
      status,
      eventId,
      userId,
      customerId,
    } = query;

    const whereClause: Prisma.TransactionWhereInput = {
      isDeleted: false,
    };

    if (eventId) {
      whereClause.eventId = eventId;
    }

    if (status) {
      whereClause.status = status as Status;
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

    const transactions = await prisma.transaction.findMany({
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
            point: true,
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
            organizer: {
              select: {
                fullName: true,
                bankAccount: true,
              },
            },
          },
        },
      },
    });

    const count = await prisma.transaction.count({
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
  } catch (error) {
    throw error;
  }
};
