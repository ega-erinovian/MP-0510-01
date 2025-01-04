import { prisma } from "../../lib/prisma";

export const deleteTransactionService = async (id: number) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id },
    });

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    await prisma.transaction.update({
      where: { id },
      data: { isDeleted: true },
    });

    return { message: "Transaction deleted successfully." };
  } catch (error) {
    throw error;
  }
};
