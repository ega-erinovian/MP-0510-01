import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface GetTransactionIncomePerMonthQuery {
  eventId?: number;
  userId?: number;
}

export const getTransactionIncomePerMonthService = async (
  query: GetTransactionIncomePerMonthQuery
) => {
  try {
    const { eventId, userId } = query;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    const endDate = new Date(now.getFullYear() + 1, 0, 1);

    const whereClause: Prisma.TransactionWhereInput = {
      isDeleted: false,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
      status: {
        equals: "DONE",
      },
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
      const monthIndex = transaction.createdAt.getMonth();
      monthlyChart[monthIndex].value += transaction._sum.totalPrice || 0;
    });

    return monthlyChart;
  } catch (error) {
    throw error;
  }
};
