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
exports.createEventService = void 0;
const cloudinary_1 = require("../../lib/cloudinary");
const prisma_1 = require("../../lib/prisma");
const createEventService = (body, thumbnnail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = body;
        const existingEvent = yield prisma_1.prisma.event.findFirst({
            where: { title },
        });
        if (existingEvent) {
            throw new Error("Event Exists");
        }
        const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(thumbnnail);
        const createEvent = yield prisma_1.prisma.event.create({
            data: Object.assign(Object.assign({}, body), { thumbnnail: secure_url, price: Number(body.price), availableSeats: Number(body.availableSeats), categoryId: Number(body.categoryId), cityId: Number(body.cityId), userId: Number(body.userId) }),
        });
        return createEvent;
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unexpected error");
    }
});
exports.createEventService = createEventService;
