import { User } from "@prisma/client";
import { comparePassword } from "../../lib/argon";
import { prisma } from "../../lib/prisma";

interface Body extends Pick<User, "id" | "password"> {}

export const checkOldPasswordService = async (body: Body) => {
  try {
    const { id, password } = body;

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return { isValid: false, message: "Password invalid" };
    }

    return { isValid: true, message: "Password valid" };
  } catch (error) {
    throw error;
  }
};
