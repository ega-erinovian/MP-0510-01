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

    // Update each transaction to REJECTED
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
