import { Referral } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const createReferralService = async (body: Referral) => {
  try {
    const { referrerUserId, code } = body;

    const existingReferral = await prisma.referral.findFirst({
      where: { code },
    });

    if (existingReferral) {
      throw new Error("Referral already exist");
    }

    return await prisma.referral.create({
      data: {
        referrerUserId,
        code,
      },
    });
  } catch (error) {
    throw error;
  }
};
