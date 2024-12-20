import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PaginationQueryParams } from "../../types/pagination";

interface GetReferralsQuery extends PaginationQueryParams {}

export const getReferralsService = async (query: GetReferralsQuery) => {
  try {
    const { page, sortBy, sortOrder, take } = query;

    const whereClause: Prisma.ReferralWhereInput = {};

    const referrals = await prisma.referral.findMany({
      where: whereClause,
      include: {
        refereeUser: {
          select: {
            fullName: true,
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
