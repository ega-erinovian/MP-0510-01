import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetCouponsQuery {
  userId?: number;
  search?: string;
}

export const getCouponsService = async (query: GetCouponsQuery) => {
  try {
    const { userId, search } = query;
    const whereClause: Prisma.CouponWhereInput = {
      isUsed: false,
    };

    if (userId) {
      whereClause.userId = userId;
    }

    if (search) {
      whereClause.OR = [{ code: { contains: search } }];
    }

    const coupons = await prisma.coupon.findMany({
      where: whereClause,
    });

    return { data: coupons };
  } catch (error) {
    throw error;
  }
};
