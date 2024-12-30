import { Status, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { transporter } from "../../lib/nodemailer";
import { cloudinaryUpload } from "../../lib/cloudinary";
import {
  formatCurrency,
  loadEmailTemplate,
  replaceTemplateVariables,
} from "../../utils/TemplateUtils";

interface UpdateTransactionBody {
  status?: Status;
  email?: string;
  paymentProof?: string;
}

export const updateTransactionService = async (
  body: UpdateTransactionBody,
  id: number,
  paymentProof?: Express.Multer.File
) => {
  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
        event: {
          select: {
            title: true,
            price: true,
            address: true,
            city: {
              select: {
                name: true,
              },
            },
            startDate: true,
            availableSeats: true,
            userId: true,
          },
        },
      },
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    let secure_url = existingTransaction.paymentProof || "";

    if (paymentProof) {
      secure_url = (await cloudinaryUpload(paymentProof)).secure_url;
    }

    const updateData: Partial<UpdateTransactionBody> = {};

    if (body.status) updateData.status = body.status;
    updateData.paymentProof = secure_url;

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: updateData,
    });

    if (body.status === Status.DONE || body.status === Status.REJECTED) {
      const template = await loadEmailTemplate();

      const emailContent = replaceTemplateVariables(template, {
        recipientName: existingTransaction.user.fullName,
        eventTitle: existingTransaction.event.title,
        eventDate: existingTransaction.event.startDate.toDateString(),
        eventVenue: existingTransaction.event.address!,
        ticketId: existingTransaction.id.toString(),
        totalPaid: existingTransaction.totalPrice,
        status: updatedTransaction.status,
        ifDone: `
          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">Your Entry QR Code</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${updatedTransaction.id}" alt="Entry QR Code" style="max-width: 200px; height: auto;">
            <p style="font-size: 14px; color: #666; margin-top: 16px;">Please present this QR code at the entrance for quick access.</p>
          </div>
        `,
        ifRejected: `
          <div style="background-color: #ffebee; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #c62828; margin-top: 0;">Transaction Rejected</h2>
            <p style="margin-top: 10px;">Please contact our support team for further assistance and information on how to proceed.</p>
          </div>
        `,
      });

      await transporter.sendMail({
        to: body.email,
        subject: `Ticket Status Update for ${existingTransaction.event.title}`,
        html: emailContent,
      });

      // Additional steps for rejected transactions
      if (body.status === Status.REJECTED) {
        await transporter.sendMail({
          to: body.email,
          subject: `Rejected Transaction Alert - ID: ${id}`,
          html: `
            <p>A transaction has been rejected:</p>
            <ul>
              <li>Transaction ID: ${id}</li>
              <li>User: ${existingTransaction.user.fullName} (${
            body.email
          })</li>
              <li>Event: ${existingTransaction.event.title}</li>
              <li>Amount: ${formatCurrency(existingTransaction.totalPrice)}</li>
            </ul>
            <p>Please follow up with the user if necessary.</p>
          `,
        });
      }

      return updatedTransaction;
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating the transaction");
  }
};
