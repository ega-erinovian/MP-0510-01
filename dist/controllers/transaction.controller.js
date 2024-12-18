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
exports.deleteTransactionController = exports.updateTransactionController = exports.getTransactionsController = void 0;
const get_transactions_service_1 = require("../services/transactions/get-transactions.service");
const delete_transaction_service_1 = require("../services/transactions/delete-transaction.service");
const update_transaction_service_1 = require("../services/transactions/update-transaction.service");
const getTransactionsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 10,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "id",
            sortOrder: req.query.sortOrder || "desc",
            search: req.query.search || "",
            eventId: parseInt(req.query.eventId) || 0,
        };
        const result = yield (0, get_transactions_service_1.getTransactionsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionsController = getTransactionsController;
const updateTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, update_transaction_service_1.updateTransactionService)(req.body, parseInt(id));
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
