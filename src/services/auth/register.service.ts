import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/argon";
import { cloudinaryUpload } from "../../lib/cloudinary";

export const registerService = async (
  body: User,
  profilePicture: Express.Multer.File
) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Account already exist");
    }

    const { secure_url } = await cloudinaryUpload(profilePicture);

    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
      data: {
        ...body,
        cityId:
          typeof body.cityId === "string"
            ? parseInt(body.cityId, 10)
            : body.cityId,
        password: hashedPassword,
        profilePicture: secure_url,
      },
    });
  } catch (error) {
    throw error;
  }
};
