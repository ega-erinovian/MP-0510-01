import { Transaction } from "@prisma/client";
import { cloudinaryUpload } from "../../lib/cloudinary";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import {
  formatCurrency,
  loadEmailTemplate,
  replaceTemplateVariables,
} from "../../utils/TemplateUtils";

interface UpdateTransactionBody {
  status?: Transaction["status"];
  email?: string;
  paymentProof?: string;
  voucherId?: number | null;
  couponId?: number | null;
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

    const updateData: Partial<UpdateTransactionBody> = {};
    let secure_url = existingTransaction.paymentProof || "";

    if (paymentProof) {
      try {
        secure_url = (await cloudinaryUpload(paymentProof)).secure_url;
        updateData.paymentProof = secure_url;
      } catch (uploadError) {
        console.error("File upload failed. Details:", uploadError);
        throw new Error("File upload failed. Please try again.");
      }
    }

    if (body.status) updateData.status = body.status;

    if (body.voucherId !== undefined) {
      updateData.voucherId =
        body.voucherId === null ? null : Number(body.voucherId);
    }

    if (body.couponId !== undefined) {
      updateData.couponId =
        body.couponId === null ? null : Number(body.couponId);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: updateData,
    });

    if (body.status === "DONE" || body.status === "REJECTED") {
      try {
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

        if (body.status === "REJECTED") {
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
                <li>Amount: ${formatCurrency(
                  existingTransaction.totalPrice
                )}</li>
              </ul>
              <p>Please follow up with the user if necessary.</p>
            `,
          });
        }
      } catch (emailError) {
        console.error("Failed to send email. Details:", emailError);
      }
    }

    return updatedTransaction;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error(
      `An error occurred while updating the transaction: ${error}`
    );
  }
};
