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
exports.getRemainingTimeController = exports.deleteTransactionController = exports.updateTransactionController = exports.createTransactionController = exports.getTransactionsIncomePerMonthController = exports.getTransactionsIncomeController = exports.getTransactionsQuantityController = exports.getTransactionsController = void 0;
const delete_transaction_service_1 = require("../services/transactions/delete-transaction.service");
const get_transactions_income_per_month_service_1 = require("../services/transactions/get-transactions-income-per-month.service");
const get_transactions_income_service_1 = require("../services/transactions/get-transactions-income.service");
const get_transactions_qty_service_1 = require("../services/transactions/get-transactions-qty.service");
const get_transactions_service_1 = require("../services/transactions/get-transactions.service");
const update_transaction_service_1 = require("../services/transactions/update-transaction.service");
const create_transaction_service_1 = require("../services/transactions/create-transaction.service");
const prisma_1 = require("../lib/prisma");
const getTransactionsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 10,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "id",
            sortOrder: req.query.sortOrder || "desc",
            search: req.query.search || "",
            status: req.query.status || "",
            eventId: parseInt(req.query.eventId) || 0,
            userId: parseInt(req.query.userId) || 0,
            customerId: parseInt(req.query.customerId) || 0,
        };
        const result = yield (0, get_transactions_service_1.getTransactionsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsController = getTransactionsController;
const getTransactionsQuantityController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            timeFilter: req.query.timeFilter || "day",
            eventId: parseInt(req.query.eventId) || 0,
            userId: parseInt(req.query.userId) || 0,
        };
        const result = yield (0, get_transactions_qty_service_1.getTransactionQuantityService)(query);
        res.status(200).send({ qty: result });
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsQuantityController = getTransactionsQuantityController;
const getTransactionsIncomeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            timeFilter: req.query.timeFilter || "day",
            eventId: parseInt(req.query.eventId) || 0,
            userId: parseInt(req.query.userId) || 0,
        };
        const result = yield (0, get_transactions_income_service_1.getTransactionIncomeService)(query);
        res.status(200).send({ income: result });
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsIncomeController = getTransactionsIncomeController;
const getTransactionsIncomePerMonthController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            eventId: parseInt(req.query.eventId) || 0,
            userId: parseInt(req.query.userId) || 0,
        };
        const result = yield (0, get_transactions_income_per_month_service_1.getTransactionIncomePerMonthService)(query);
        res.status(200).send({ income: result });
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsIncomePerMonthController = getTransactionsIncomePerMonthController;
const createTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const files = req.files;
        const paymentProof = (_a = files === null || files === void 0 ? void 0 : files.paymentProof) === null || _a === void 0 ? void 0 : _a[0];
        const result = yield (0, create_transaction_service_1.createTransactionService)(req.body, paymentProof);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createTransactionController = createTransactionController;
const updateTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const files = req.files;
        const paymentProof = (_a = files === null || files === void 0 ? void 0 : files.paymentProof) === null || _a === void 0 ? void 0 : _a[0];
        const result = yield (0, update_transaction_service_1.updateTransactionService)(req.body, parseInt(id), paymentProof);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTransactionController = updateTransactionController;
const deleteTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        //   const userId = Number(res.locals.user.id); // Mengambil id dari token milik user
        const result = yield (0, delete_transaction_service_1.deleteTransactionService)(id /*userId*/);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTransactionController = deleteTransactionController;
const getRemainingTimeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send({ error: "Transaction ID is required" });
            return;
        }
        const transaction = yield prisma_1.prisma.transaction.findUnique({
            where: { id: Number(id) },
        });
        if (!transaction) {
            res.status(404).send({ error: "Transaction not found" });
            return;
        }
        const expiryTime = new Date(transaction.createdAt.getTime() + 2 * 60 * 60 * 1000); // 2 hours
        const timeLeft = Math.max(0, expiryTime.getTime() - Date.now());
        res.status(200).send({ timeLeft });
    }
    catch (error) {
        next(error);
    }
});
exports.getRemainingTimeController = getRemainingTimeController;
