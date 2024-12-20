import { Coupon } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const createCouponService = async (body: Coupon) => {
  try {
    const { code } = body;

    const existingCoupon = await prisma.coupon.findFirst({
      where: { code },
    });

    if (existingCoupon) {
      throw new Error("Coupon already exist");
    }

    return await prisma.coupon.create({
      data: { ...body },
    });
  } catch (error) {
    throw error;
  }
};
