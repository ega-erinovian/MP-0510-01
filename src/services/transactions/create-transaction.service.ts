import { Transaction } from "@prisma/client";
import { cloudinaryUpload } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

interface CreateTransactionBody {
  status: Transaction["status"];
  qty: number;
  totalPrice: number;
  voucherId?: number;
  couponId?: number;
  userId: number;
  eventId: number;
  isUsePoint?: boolean | string;
}

export const createTransactionService = async (
  body: CreateTransactionBody,
  paymentProof?: Express.Multer.File
) => {
  try {
    let secure_url = null;

    if (paymentProof) {
      secure_url = (await cloudinaryUpload(paymentProof)).secure_url;
    }

    const transactionData: any = {
      status: body.status,
      qty: Number(body.qty),
      totalPrice: Number(body.totalPrice),
      userId: Number(body.userId),
      eventId: Number(body.eventId),
      paymentProof: secure_url,
      isUsePoint:
        typeof body.isUsePoint === "string"
          ? body.isUsePoint === "true"
          : body.isUsePoint ?? false,
    };

    if (body.voucherId !== undefined) {
      transactionData.voucherId = Number(body.voucherId);
    }

    if (body.couponId !== undefined) {
      transactionData.couponId = Number(body.couponId);
    }

    return await prisma.transaction.create({
      data: transactionData,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
