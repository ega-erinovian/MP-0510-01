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
exports.deleteEventController = exports.updateEventController = exports.createEventController = exports.getEventController = exports.getEventsController = void 0;
const delete_event_service_1 = require("../services/event/delete-event.service");
const get_event_service_1 = require("../services/event/get-event.service");
const get_events_service_1 = require("../services/event/get-events.service");
const update_event_service_1 = require("../services/event/update-event.service");
const create_event_service_1 = require("../services/event/create-event.service");
const getEventsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            take: parseInt(req.query.take) || 3,
            page: parseInt(req.query.page) || 1,
            sortBy: req.query.sortBy || "id",
            sortOrder: req.query.sortOrder || "desc",
            search: req.query.search || "",
            categoryId: parseInt(req.query.categoryId) || 0,
            userId: parseInt(req.query.userId) || 0,
            cityId: parseInt(req.query.cityId) || 0,
        };
        const result = yield (0, get_events_service_1.getEventsService)(query);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventsController = getEventsController;
const getEventController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, get_event_service_1.getEventService)(parseInt(id));
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getEventController = getEventController;
const createEventController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const files = req.files;
        const thumbnail = (_a = files === null || files === void 0 ? void 0 : files.thumbnnail) === null || _a === void 0 ? void 0 : _a[0];
        const result = yield (0, create_event_service_1.createEventService)(req.body, thumbnail);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createEventController = createEventController;
const updateEventController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const files = req.files;
        const thumbnail = (_a = files === null || files === void 0 ? void 0 : files.thumbnnail) === null || _a === void 0 ? void 0 : _a[0];
        const result = yield (0, update_event_service_1.updateEventService)(req.body, Number(id), thumbnail);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateEventController = updateEventController;
const deleteEventController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield (0, delete_event_service_1.deleteEventService)(id);
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEventController = deleteEventController;
