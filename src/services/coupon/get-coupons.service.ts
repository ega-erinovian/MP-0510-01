import { Prisma, PromoStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetCouponsQuery {
  userId?: number;
  search?: string;
  isUsed?: PromoStatus;
}

export const getCouponsService = async (query: GetCouponsQuery) => {
  try {
    const { userId, search, isUsed } = query;
    const whereClause: Prisma.CouponWhereInput = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (isUsed) {
      whereClause.isUsed = isUsed;
    }

    if (search) {
      whereClause.OR = [{ code: { equals: search } }];
    }

    const coupons = await prisma.coupon.findMany({
      where: whereClause,
    });

    return { data: coupons };
  } catch (error) {
    throw error;
  }
};
