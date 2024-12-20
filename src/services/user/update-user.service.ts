import { prisma } from "../../lib/prisma";

interface UpdateUserBody {
  fullName?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  phoneNumber?: string;
  cityId?: number;
  point?: number;
  pointExpired?: Date;
}

export const updateUserService = async (body: UpdateUserBody, id: number) => {
  try {
    const { email } = body;

    // Find the existing voucher by ID
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (email) {
      const existingEmail = await prisma.user.findFirst({
        where: { email },
      });

      if (existingEmail) {
        throw new Error("Email already exist");
      }
    }

    // Update the voucher
    return await prisma.user.update({
      where: { id },
      data: {
        ...body,
      },
    });
  } catch (error) {
    throw error;
  }
};
