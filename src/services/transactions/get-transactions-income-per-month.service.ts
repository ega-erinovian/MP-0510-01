import { Prisma, Status } from "@prisma/client";
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

    // Fetch transactions grouped by month
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

    // Initialize monthly chart with zero values
    const monthlyChart = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "long" }),
      value: 0,
    }));

    // Sum up total prices for each month
    transactions.forEach((transaction) => {
      const monthIndex = transaction.createdAt.getMonth(); // Get month index (0-11)
      monthlyChart[monthIndex].value += transaction._sum.totalPrice || 0; // Sum totalPrice
    });

    return monthlyChart;
  } catch (error) {
    throw error;
  }
};
