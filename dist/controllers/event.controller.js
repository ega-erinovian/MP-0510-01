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
exports.getEventsController = void 0;
const get_events_service_1 = require("../services/event/get-events.service");
const getEventsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 3,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "id",
            sortOrder: req.query.sortOrder || "desc",
            search: req.query.search || "",
            categoryId: parseInt(req.query.categoryId) || 0,
        };
        const result = yield (0, get_events_service_1.getEventsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventsController = getEventsController;
