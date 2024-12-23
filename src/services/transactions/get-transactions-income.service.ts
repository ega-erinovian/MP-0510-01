import { Prisma, Status } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetTransactionIncomeQuery {
  timeFilter: string;
  eventId?: number;
  userId?: number;
}

export const getTransactionIncomeService = async (
  query: GetTransactionIncomeQuery
) => {
  try {
    const { timeFilter, eventId, userId } = query;

    // Calculate the date range based on the time filter
    const now = new Date();
    let startDate = new Date();

    switch (timeFilter) {
      case "day":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        throw new Error("Invalid time filter");
    }

    const whereClause: Prisma.TransactionWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: startDate,
        lte: now,
      },
      status: Status.DONE,
    };

    if (eventId) {
      whereClause.eventId = eventId;
    }

    if (userId) {
      whereClause.event = {
        userId: userId,
      };
    }

    const result = await prisma.transaction.aggregate({
      where: whereClause,
      _sum: {
        totalPrice: true,
      },
    });

    return result._sum.totalPrice || 0;
  } catch (error) {
    throw error;
  }
};
