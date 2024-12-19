import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetAttendeesQuery extends PaginationQueryParams {}

export const getAttendeesService = async (
  transactionId: number,
  query: GetAttendeesQuery
) => {
  try {
    const { page, sortBy, sortOrder, take } = query;

    const whereClause: Prisma.UserWhereInput = {
      isDeleted: false,
      transactions: { some: { status: "DONE", id: transactionId } },
    };

    const attendeList = await prisma.user.findMany({
      where: whereClause,
      skip: (page - 1) * take, // offset
      take: take, // limit
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        transactions: {
          select: {
            qty: true,
          },
        },
      },
    });

    const count = await prisma.user.count({
      where: whereClause,
    });

    return { data: attendeList, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
