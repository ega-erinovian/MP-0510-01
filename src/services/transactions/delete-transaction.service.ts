import { prisma } from "../../lib/prisma";

export const deleteTransactionService = async (
  id: number /* userId: number */
) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id },
    });

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    // if (blog.userId !== userId) {
    //   throw new Error("You are not authorized to delete this blog.");
    // }

    await prisma.transaction.update({
      where: { id },
      data: { isDeleted: true },
    });

    return { message: "Transaction deleted successfully." };
  } catch (error) {
    throw error;
  }
};
