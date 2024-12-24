import { User } from "@prisma/client";
import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { Express } from "express"; // Make sure Express types are included

interface UpdateUserBody {
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  cityId?: number;
  point?: number;
  pointExpired?: Date;
}

export const updateUserService = async (
  body: UpdateUserBody,
  id: number,
  profilePicture?: Express.Multer.File
) => {
  try {
    const { email } = body;

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

      if (existingEmail && existingEmail.id !== id) {
        throw new Error("Email already exists");
      }
    }

    let secure_url = existingUser.profilePicture;

    if (profilePicture) {
      secure_url = (await cloudinaryUpload(profilePicture)).secure_url;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...body,
        profilePicture: secure_url,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error"
    );
  }
};
