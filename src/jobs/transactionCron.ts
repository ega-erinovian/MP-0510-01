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
        data: { status: "REJECTED" },
      });

      console.log(`Transaction ${transaction.id} updated to REJECTED.`);
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

    // Update each voucher to EXPIRED
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

    // Update each voucher to EXPIRED
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
    // Calculate date 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Set to beginning of the day for more precise comparison
    threeMonthsAgo.setHours(0, 0, 0, 0);

    const existingUser = await prisma.user.findMany({
      where: {
        isDeleted: false,
        point: {
          lte: 0,
        },
        pointExpired: {
          lte: threeMonthsAgo, // Less than or equal to 3 months ago
        },
      },
    });

    // Update each voucher to EXPIRED
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
