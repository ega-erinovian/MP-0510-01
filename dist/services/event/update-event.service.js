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
exports.updateEventService = void 0;
const cloudinary_1 = require("../../lib/cloudinary");
const prisma_1 = require("../../lib/prisma");
const updateEventService = (body, id, thumbnnail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEvent = yield prisma_1.prisma.event.findUnique({
            where: { id },
        });
        if (!existingEvent) {
            throw new Error("Event not found");
        }
        let secure_url = existingEvent.thumbnnail;
        if (thumbnnail) {
            secure_url = (yield (0, cloudinary_1.cloudinaryUpload)(thumbnnail)).secure_url;
        }
        const updatedData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (body.title !== undefined && { title: body.title })), (body.description !== undefined && { description: body.description })), (body.description !== undefined && { address: body.address })), (body.price !== undefined && { price: Number(body.price) })), (body.availableSeats !== undefined && {
            availableSeats: Number(body.availableSeats),
        })), (body.startDate !== undefined && { startDate: body.startDate })), (body.endDate !== undefined && { endDate: body.endDate })), (body.categoryId !== undefined && {
            categoryId: Number(body.categoryId),
        })), (body.cityId !== undefined && { cityId: Number(body.cityId) })), { thumbnnail: secure_url });
        const updatedEvent = yield prisma_1.prisma.event.update({
            where: { id },
            data: updatedData,
        });
        return updatedEvent;
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unexpected error");
    }
});
exports.updateEventService = updateEventService;
