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
exports.deleteEventService = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteEventService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield prisma_1.prisma.event.findFirst({
            where: { id },
        });
        if (!event) {
            throw new Error("Event not found.");
        }
        yield prisma_1.prisma.event.update({
            where: { id },
            data: { isDeleted: true },
        });
        return { message: "Event deleted successfully." };
    }
    catch (error) {
        throw error;
    }
});
exports.deleteEventService = deleteEventService;
