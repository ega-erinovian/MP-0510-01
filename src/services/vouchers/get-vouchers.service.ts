import { Prisma, PromoStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetVouchersQuery extends PaginationQueryParams {
  search?: string;
  eventId?: number;
  userId?: number;
  isUsed?: PromoStatus;
}

export const getVouchersService = async (query: GetVouchersQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search, eventId, userId, isUsed } =
      query;

    const parsedEventId = eventId && Number(eventId);

    const whereClause: Prisma.VoucherWhereInput = {};

    if (parsedEventId) {
      whereClause.eventId = parsedEventId; // Use parsed value
    }

    if (isUsed) {
      whereClause.isUsed = isUsed;
    }

    if (search) {
      whereClause.OR = [
        { code: { equals: search } },
        { event: { title: { contains: search } } },
      ];
    }

    if (userId) {
      whereClause.event = {
        userId: userId,
      };
    }

    const vouchers = await prisma.voucher.findMany({
      where: whereClause,
      skip: (page - 1) * take, // offset
      take: take, // limit
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            category: true,
            price: true,
            availableSeats: true,
            userId: true,
          },
        },
      },
    });

    const count = await prisma.voucher.count({
      where: whereClause,
    });

    return { data: vouchers, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
