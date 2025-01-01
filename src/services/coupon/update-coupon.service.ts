import { PromoStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";

interface UpdateCouponBody {
  userId?: number;
  code?: string;
  amount?: number;
  expiresAt?: Date;
  isUsed?: PromoStatus;
}

export const updateCouponService = async (
  body: UpdateCouponBody,
  id: number
) => {
  try {
    const { code } = body;

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      throw new Error("Coupon not found");
    }

    if (code && code !== existingCoupon.code) {
      const couponWithCode = await prisma.coupon.findFirst({
        where: { code },
      });

      if (couponWithCode) {
        throw new Error("Coupon with this code already exists");
      }
    }

    return await prisma.coupon.update({
      where: { id },
      data: {
        ...body,
      },
    });
  } catch (error) {
    throw error;
  }
};
