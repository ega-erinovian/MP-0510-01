import { Status, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { transporter } from "../../lib/nodemailer";

interface UpdateTransactionBody {
  status?: Status;
  email?: string;
}

export const updateTransactionService = async (
  body: UpdateTransactionBody,
  id: number
) => {
  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        status: body.status,
      },
    });

    if (body.status === Status.DONE || body.status === Status.REJECTED) {
      transporter.sendMail({
        to: body.email,
        subject: `Your Payment Status with ID ${id} is Updated`,
        html: `<b>Hi ${body.email},</b><br/>
        <p>Your payment status is updated to: <b>${body.status}</b>.</p>
        <p>Please show this qr code to at the entrance gate to verify your payment.</p>
        ${
          body.status === Status.DONE &&
          '<img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fgithub.com%2F&chs=180x180&choe=UTF-8&chld=L|2"><br/>'
        }
        <p>Thank you for using our service.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact us.</p>`,
      });
    }

    return updatedTransaction;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the transaction");
  }
};
