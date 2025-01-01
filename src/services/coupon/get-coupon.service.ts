import { prisma } from "../../lib/prisma";

export const getCouponService = async (id: number) => {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!coupon) {
      throw new Error("Coupon not found");
    }

    return coupon;
  } catch (error) {
    throw error;
  }
};
