"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../lib/prisma");
const nodemailer_1 = require("../../lib/nodemailer");
const cloudinary_1 = require("../../lib/cloudinary");
const TemplateUtils_1 = require("../../utils/TemplateUtils");
const updateTransactionService = (body, id, paymentProof) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTransaction = yield prisma_1.prisma.transaction.findUnique({
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
        const updateData = {};
        let secure_url = existingTransaction.paymentProof || "";
        if (paymentProof) {
            secure_url = (yield (0, cloudinary_1.cloudinaryUpload)(paymentProof)).secure_url;
            updateData.paymentProof = secure_url;
        }
        if (body.status)
            updateData.status = body.status;
        if (body.voucherId !== undefined) {
            updateData.voucherId =
                body.voucherId === null ? null : Number(body.voucherId);
        }
        if (body.couponId !== undefined) {
            updateData.couponId =
                body.couponId === null ? null : Number(body.couponId);
        }
        const updatedTransaction = yield prisma_1.prisma.transaction.update({
            where: { id },
            data: updateData,
        });
        if (body.status === client_1.Status.DONE || body.status === client_1.Status.REJECTED) {
            const template = yield (0, TemplateUtils_1.loadEmailTemplate)();
            const emailContent = (0, TemplateUtils_1.replaceTemplateVariables)(template, {
                recipientName: existingTransaction.user.fullName,
                eventTitle: existingTransaction.event.title,
                eventDate: existingTransaction.event.startDate.toDateString(),
                eventVenue: existingTransaction.event.address,
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
            yield nodemailer_1.transporter.sendMail({
                to: body.email,
                subject: `Ticket Status Update for ${existingTransaction.event.title}`,
                html: emailContent,
            });
            // Additional steps for rejected transactions
            if (body.status === client_1.Status.REJECTED) {
                yield nodemailer_1.transporter.sendMail({
                    to: body.email,
                    subject: `Rejected Transaction Alert - ID: ${id}`,
                    html: `
            <p>A transaction has been rejected:</p>
            <ul>
              <li>Transaction ID: ${id}</li>
              <li>User: ${existingTransaction.user.fullName} (${body.email})</li>
              <li>Event: ${existingTransaction.event.title}</li>
              <li>Amount: ${(0, TemplateUtils_1.formatCurrency)(existingTransaction.totalPrice)}</li>
            </ul>
            <p>Please follow up with the user if necessary.</p>
          `,
                });
            }
            return updatedTransaction;
        }
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while updating the transaction");
    }
});
exports.updateTransactionService = updateTransactionService;
