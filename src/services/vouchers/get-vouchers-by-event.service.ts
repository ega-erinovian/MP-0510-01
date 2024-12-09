import { prisma } from "../../lib/prisma";

export const getVouchersByEventService = async (id: number) => {
  try {
    const vouchers = prisma.voucher.findMany({
      where: {
        event: {
          id,
        },
      },
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
