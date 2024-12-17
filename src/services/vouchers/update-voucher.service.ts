import { prisma } from "../../lib/prisma";

interface UpdateVoucherBody {
  eventId?: number;
  code?: string;
  amount?: number;
  expiresAt?: Date;
  isUsed?: boolean;
}

export const updateVoucherService = async (
  body: UpdateVoucherBody,
  id: number
) => {
  try {
    const { code } = body;

    // Find the existing voucher by ID
    const existingVoucher = await prisma.voucher.findUnique({
      where: { id },
    });

    if (!existingVoucher) {
      throw new Error("Voucher not found");
    }

    // Only check for an existing voucher with the same code if it's different from the current voucher's code
    if (code && code !== existingVoucher.code) {
      const voucherWithCode = await prisma.voucher.findFirst({
        where: { code },
      });

      if (voucherWithCode) {
        throw new Error("Voucher with this code already exists");
      }
    }

    // Update the voucher
    return await prisma.voucher.update({
      where: { id },
      data: {
        ...body,
      },
    });
  } catch (error) {
    throw error;
  }
};
