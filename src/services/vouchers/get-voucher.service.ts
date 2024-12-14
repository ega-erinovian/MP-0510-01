import { prisma } from "../../lib/prisma";

export const getVoucherService = async (id: number) => {
  try {
    // Find the existing voucher by ID
    const voucher = await prisma.voucher.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            category: true,
            price: true,
            availableSeats: true,
            userId: true,
          },
        },
      },
    });

    if (!voucher) {
      throw new Error("Voucher not found");
    }

    return voucher;
  } catch (error) {
    throw error;
  }
};
