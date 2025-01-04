import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetTransactionQuantityQuery {
  timeFilter: string;
  eventId?: number;
  userId?: number;
}

export enum Status {
  UNPAID = "UNPAID",
  CONFIRMING = "CONFIRMING",
  DONE = "DONE",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}

export const getTransactionQuantityService = async (
  query: GetTransactionQuantityQuery
) => {
  try {
    const { timeFilter, eventId, userId } = query;

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
        qty: true,
      },
    });

    return result._sum.qty || 0;
  } catch (error) {
    throw error;
  }
};
