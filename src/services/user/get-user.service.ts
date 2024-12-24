import { prisma } from "../../lib/prisma";

export const getUserService = async (id: number) => {
  try {
    // Find the existing voucher by ID
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        referralsUsed: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};
