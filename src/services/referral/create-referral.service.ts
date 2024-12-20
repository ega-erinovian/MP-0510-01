import { Referral } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const createReferralService = async (body: Referral) => {
  try {
    const { referrerUserId, refereeUserId } = body;

    const existingReferral = await prisma.referral.findFirst({
      where: { refereeUserId },
    });

    if (existingReferral) {
      throw new Error("Referral already exist");
    }

    return await prisma.referral.create({
      data: {
        ...body,
      },
    });
  } catch (error) {
    throw error;
  }
};
