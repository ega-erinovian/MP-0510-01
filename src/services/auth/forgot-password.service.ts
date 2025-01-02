import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { BASE_URL_FE, JWT_SECRET_FORGOT_PASSWORD } from "../../config";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import {
  loadForgotPasswordEmailTemplate,
  replaceTemplateVariables,
} from "../../utils/TemplateUtils";

export const forgotPasswordService = async (body: Pick<User, "email">) => {
  try {
    const { email } = body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Email not found.");
    }

    const token = sign({ id: user.id }, JWT_SECRET_FORGOT_PASSWORD!, {
      expiresIn: "15m",
    });

    const link = `${BASE_URL_FE}/reset-password/${token}`;

    const template = await loadForgotPasswordEmailTemplate();
    const emailContent = replaceTemplateVariables(template, {
      link,
    });

    transporter.sendMail({
      to: email,
      subject: "Reset Your EventIn Password",
      from: "Support@EventIn",
      html: emailContent,
    });

    return { message: "Email sent successfully." };
  } catch (error) {
    throw error;
  }
};
