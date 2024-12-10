import { Voucher } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const createVoucherService = async (body: Voucher) => {
  try {
    const { eventId, code, amount, expiresAt } = body;

    const existingVoucher = await prisma.voucher.findFirst({
      where: { code },
    });

    if (existingVoucher) {
      throw new Error("Voucher already exist");
    }

    return await prisma.voucher.create({
      data: {
        eventId,
        code,
        amount,
        expiresAt,
      },
    });
  } catch (error) {
    throw error;
  }
};
