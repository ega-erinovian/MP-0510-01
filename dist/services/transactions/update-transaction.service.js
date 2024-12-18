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
const updateTransactionService = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTransaction = yield prisma_1.prisma.transaction.findUnique({
            where: { id },
        });
        if (!existingTransaction) {
            throw new Error("Transaction not found");
        }
        const updatedTransaction = yield prisma_1.prisma.transaction.update({
            where: { id },
            data: {
                status: body.status,
            },
        });
        if (body.status === client_1.Status.DONE || body.status === client_1.Status.REJECTED) {
            nodemailer_1.transporter.sendMail({
                to: body.email,
                subject: `Your Payment Status with ID ${id} is Updated`,
                html: `<b>Hi ${body.email},</b><br/>
        <p>Your payment status is updated to: <b>${body.status}</b>.</p>
        <p>Please show this qr code to at the entrance gate to verify your payment.</p>
        ${body.status === client_1.Status.DONE &&
                    '<img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fgithub.com%2F&chs=180x180&choe=UTF-8&chld=L|2"><br/>'}
        <p>Thank you for using our service.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact us.</p>`,
            });
        }
        return updatedTransaction;
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while updating the transaction");
    }
});
exports.updateTransactionService = updateTransactionService;
