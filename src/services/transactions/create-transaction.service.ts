import { Transaction } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { cloudinaryUpload } from "../../lib/cloudinary";

interface CreateTransactionBody {
  status: Transaction["status"];
  qty: number;
  totalPrice: number;
  voucherId: number | null;
  couponId: number | null;
  userId: number;
  eventId: number;
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

    return await prisma.transaction.create({
      data: {
        status: body.status,
        qty: Number(body.qty),
        totalPrice: Number(body.totalPrice),
        userId: Number(body.userId),
        eventId: Number(body.eventId),
        paymentProof: secure_url,
      },
    });
  } catch (error) {
    throw error;
  }
};
