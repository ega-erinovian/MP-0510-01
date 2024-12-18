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
exports.deleteVoucherController = exports.updateVoucherController = exports.createVoucherController = exports.getVouchersByEventController = exports.getVoucherController = exports.getVouchersController = void 0;
const get_vouchers_by_event_service_1 = require("../services/vouchers/get-vouchers-by-event.service");
const create_voucher_service_1 = require("../services/vouchers/create-voucher.service");
const get_vouchers_service_1 = require("../services/vouchers/get-vouchers.service");
const update_voucher_service_1 = require("../services/vouchers/update-voucher.service");
const delete_voucher_service_1 = require("../services/vouchers/delete-voucher.service");
const get_voucher_service_1 = require("../services/vouchers/get-voucher.service");
const getVouchersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 10,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "id",
            sortOrder: req.query.sortOrder || "desc",
            search: req.query.search || "",
            eventId: parseInt(req.query.eventId) || 0,
        };
        const result = yield (0, get_vouchers_service_1.getVouchersService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getVouchersController = getVouchersController;
const getVoucherController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, get_voucher_service_1.getVoucherService)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getVoucherController = getVoucherController;
const getVouchersByEventController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const result = yield (0, get_vouchers_by_event_service_1.getVouchersByEventService)(Number(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getVouchersByEventController = getVouchersByEventController;
const createVoucherController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, create_voucher_service_1.createVoucherService)(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createVoucherController = createVoucherController;
const updateVoucherController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, update_voucher_service_1.updateVoucherService)(req.body, parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateVoucherController = updateVoucherController;
const deleteVoucherController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, delete_voucher_service_1.deleteVoucherService)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteVoucherController = deleteVoucherController;
