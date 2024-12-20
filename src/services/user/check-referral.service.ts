import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const checkReferralService = async (code: string) => {
  try {
    const whereClause: Prisma.UserWhereInput = {
      isDeleted: false,
      referralCode: code,
    };

    const users = await prisma.user.findMany({
      where: whereClause,
    });

    return users;
  } catch (error) {
    throw error;
  }
};
