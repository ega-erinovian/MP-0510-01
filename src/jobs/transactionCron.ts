import cron from "node-cron";
import { prisma } from "../lib/prisma";

cron.schedule("* * * * *", async () => {
  console.log("Running cron job to check unpaid transactions...");

  try {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

    const unpaidTransactions = await prisma.transaction.findMany({
      where: {
        status: "UNPAID",
        createdAt: {
          lte: twoHoursAgo,
        },
      },
    });

    // Update each transaction to REJECTED
    for (const transaction of unpaidTransactions) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "EXPIRED" },
      });

      await prisma.event.update({
        where: { id: transaction.id },
        data: {
          availableSeats: {
            increment: transaction.qty,
          },
        },
      });

      if (transaction.voucherId) {
        await prisma.voucher.update({
          where: { id: transaction.voucherId },
          data: {
            isUsed: "AVAILABLE",
          },
        });
      }

      if (transaction.couponId) {
        await prisma.coupon.update({
          where: { id: transaction.couponId },
          data: {
            isUsed: "AVAILABLE",
          },
        });
      }

      if (transaction.isUsePoint) {
        const event = await prisma.event.findFirst({
          where: {
            id: transaction.eventId,
          },
          select: {
            price: true,
          },
        });

        const totalPriceBeforePoint = event?.price! * transaction.qty;

        let usedPoint = 0;

        if (transaction.isUsePoint) {
          let usedVoucher = null;
          let usedCoupon = null;
          if (transaction.voucherId) {
            usedVoucher = await prisma.voucher.findFirst({
              where: {
                id: transaction.voucherId,
              },
              select: {
                amount: true,
              },
            });
          }
          if (transaction.couponId) {
            usedCoupon = await prisma.coupon.findFirst({
              where: {
                id: transaction.couponId,
              },
              select: {
                amount: true,
              },
            });
          }

          const adjustedPrice =
            totalPriceBeforePoint -
            (usedVoucher?.amount || 0) -
            (usedCoupon?.amount || 0);

          usedPoint = adjustedPrice - transaction.totalPrice;
        }

        await prisma.user.update({
          where: { id: transaction.userId },
          data: {
            point: {
              increment: transaction.totalPrice - usedPoint,
            },
          },
        });
      }

      console.log(`Transaction ${transaction.id} updated to EXPIRED.`);
    }
  } catch (error) {
    console.error("Error processing transactions:", error);
  }
});

cron.schedule("* * * * *", async () => {
  console.log("Running cron job to check admin to confirm payment..");

  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const unpaidTransactions = await prisma.transaction.findMany({
      where: {
        status: "CONFIRMING",
        createdAt: {
          lte: yesterday,
        },
      },
    });

    for (const transaction of unpaidTransactions) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "EXPIRED" },
      });

      await prisma.event.update({
        where: { id: transaction.id },
        data: {
          availableSeats: {
            increment: transaction.qty,
          },
        },
      });

      if (transaction.voucherId) {
        await prisma.voucher.update({
          where: { id: transaction.voucherId },
          data: {
            isUsed: "AVAILABLE",
          },
        });
      }

      if (transaction.couponId) {
        await prisma.coupon.update({
          where: { id: transaction.couponId },
          data: {
            isUsed: "AVAILABLE",
          },
        });
      }

      if (transaction.isUsePoint) {
        const event = await prisma.event.findFirst({
          where: {
            id: transaction.eventId,
          },
          select: {
            price: true,
          },
        });

        const totalPriceBeforePoint = event?.price! * transaction.qty;

        let usedPoint = 0;

        if (transaction.isUsePoint) {
          let usedVoucher = null;
          let usedCoupon = null;
          if (transaction.voucherId) {
            usedVoucher = await prisma.voucher.findFirst({
              where: {
                id: transaction.voucherId,
              },
              select: {
                amount: true,
              },
            });
          }
          if (transaction.couponId) {
            usedCoupon = await prisma.coupon.findFirst({
              where: {
                id: transaction.couponId,
              },
              select: {
                amount: true,
              },
            });
          }

          const adjustedPrice =
            totalPriceBeforePoint -
            (usedVoucher?.amount || 0) -
            (usedCoupon?.amount || 0);

          usedPoint = adjustedPrice - transaction.totalPrice;
        }

        await prisma.user.update({
          where: { id: transaction.userId },
          data: {
            point: {
              increment: transaction.totalPrice - usedPoint,
            },
          },
        });
      }

      console.log(`Transaction ${transaction.id} updated to EXPIRED.`);
    }
  } catch (error) {
    console.error("Error processing transactions:", error);
  }
});

cron.schedule("* * * * *", async () => {
  console.log("Running cron job to check voucher expiries");

  try {
    const availableVoucher = await prisma.voucher.findMany({
      where: {
        isUsed: "AVAILABLE",
        expiresAt: {
          equals: new Date(),
        },
      },
    });

    for (const voucher of availableVoucher) {
      await prisma.voucher.update({
        where: { id: voucher.id },
        data: { isUsed: "EXPIRED" },
      });

      console.log(`Voucher ${voucher.id} updated to EXPIRED.`);
    }

    console.log(`Total expired vouchers: ${availableVoucher.length}`);
  } catch (error) {
    console.error("Error processing vouchers:", error);
  }
});

cron.schedule("* * * * *", async () => {
  console.log("Running cron job to check coupon expiries");

  try {
    const availableCoupon = await prisma.coupon.findMany({
      where: {
        isUsed: "AVAILABLE",
        expiresAt: {
          equals: new Date(),
        },
      },
    });

    for (const coupon of availableCoupon) {
      await prisma.coupon.update({
        where: { id: coupon.id },
        data: { isUsed: "EXPIRED" },
      });

      console.log(`Coupon ${coupon.id} updated to EXPIRED.`);
    }

    console.log(`Total expired coupons: ${availableCoupon.length}`);
  } catch (error) {
    console.error("Error processing coupons:", error);
  }
});

cron.schedule("* * * * *", async () => {
  console.log("Running cron job to check user's point expiries");

  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    threeMonthsAgo.setHours(0, 0, 0, 0);

    const existingUser = await prisma.user.findMany({
      where: {
        isDeleted: false,
        point: {
          lte: 0,
        },
        pointExpired: {
          lte: threeMonthsAgo,
        },
      },
    });

    for (const user of existingUser) {
      await prisma.user.update({
        where: { id: user.id },
        data: { point: 0 },
      });

      console.log(`User's ${user.id} point updated to 0 because it's expired.`);
    }
  } catch (error) {
    console.error("Error processing coupons:", error);
  }
});
