import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetTransactionIncomePerMonthQuery {
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

export const getTransactionIncomePerMonthService = async (
  query: GetTransactionIncomePerMonthQuery
) => {
  try {
    const { eventId, userId } = query;

    // Set the date range for the entire year
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1); // January 1st of the current year
    const endDate = new Date(now.getFullYear() + 1, 0, 1); // January 1st of the next year

    const whereClause: Prisma.TransactionWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: startDate,
        lt: endDate,
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

    const transactions = await prisma.transaction.groupBy({
      by: ["createdAt"],
      where: whereClause,
      _sum: {
        totalPrice: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const monthlyChart = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "long" }),
      value: 0,
    }));

    transactions.forEach((transaction) => {
      const monthIndex = transaction.createdAt.getMonth(); // Get month index (0-11)
      monthlyChart[monthIndex].value += transaction._sum.totalPrice || 0; // Sum totalPrice
    });

    return monthlyChart;
  } catch (error) {
    throw error;
  }
};
