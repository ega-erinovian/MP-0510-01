import { prisma } from "../../lib/prisma";

export const deleteVoucherService = async (id: number) => {
  try {
    // Find the existing voucher by ID
    const existingVoucher = await prisma.voucher.findUnique({
      where: { id },
    });

    if (!existingVoucher) {
      throw new Error("Voucher not found");
    }

    await prisma.voucher.delete({
      where: { id },
    });

    return { message: `Voucher #${id} deleted successfully` };
  } catch (error) {
    throw error;
  }
};
