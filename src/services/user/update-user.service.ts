import { User } from "@prisma/client";
import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import { Express } from "express";

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
): Promise<User> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (body.email) {
      const existingEmail = await prisma.user.findFirst({
        where: { email: body.email },
      });

      if (existingEmail && existingEmail.id !== id) {
        throw new Error("Email already exists");
      }
    }

    let secure_url = existingUser.profilePicture;
    if (profilePicture) {
      secure_url = (await cloudinaryUpload(profilePicture)).secure_url;
    }

    const updateData: Partial<User> = {};

    if (body.fullName) updateData.fullName = body.fullName;
    if (body.email) updateData.email = body.email;
    if (body.password) updateData.password = body.password;
    if (body.phoneNumber) updateData.phoneNumber = body.phoneNumber;
    if (body.cityId !== undefined && !isNaN(body.cityId)) {
      updateData.cityId = Number(body.cityId);
    }
    if (body.point !== undefined && !isNaN(body.point)) {
      updateData.point = Number(body.point);
    }
    if (body.pointExpired) {
      updateData.pointExpired = body.pointExpired;
    }
    updateData.profilePicture = secure_url;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error"
    );
  }
};
