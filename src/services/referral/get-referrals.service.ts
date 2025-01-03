import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetReferralsQuery extends PaginationQueryParams {
  userId?: number;
}

export const getReferralsService = async (query: GetReferralsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, userId } = query;

    const whereClause: Prisma.ReferralWhereInput = {};

    if (userId) {
      whereClause.referrerUserId = userId;
    }

    const referrals = await prisma.referral.findMany({
      where: whereClause,
      include: {
        refereeUser: {
          select: {
            fullName: true,
            createdAt: true,
          },
        },
      },
    });

    const count = await prisma.referral.count({
      where: whereClause,
    });

    return { data: referrals, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
