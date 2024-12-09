import { prisma } from "../../lib/prisma";

export const getVouchersService = async () => {
  try {
    const vouchers = prisma.voucher.findMany({
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
    return vouchers;
  } catch (error) {
    throw error;
  }
};
