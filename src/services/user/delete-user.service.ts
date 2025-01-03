import { prisma } from "../../lib/prisma";

export const deleteUserService = async (id: number) => {
  try {
    // Find the existing voucher by ID
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    await prisma.user.delete({
      where: { id },
    });

    return { message: `User #${id} deleted successfully` };
  } catch (error) {
    throw error;
  }
};
