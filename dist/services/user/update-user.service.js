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
exports.updateUserService = void 0;
const cloudinary_1 = require("../../lib/cloudinary");
const prisma_1 = require("../../lib/prisma");
const updateUserService = (body, id, profilePicture) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = body;
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (email) {
            const existingEmail = yield prisma_1.prisma.user.findFirst({
                where: { email },
            });
            if (existingEmail && existingEmail.id !== id) {
                throw new Error("Email already exists");
            }
        }
        let secure_url = existingUser.profilePicture;
        if (profilePicture) {
            secure_url = (yield (0, cloudinary_1.cloudinaryUpload)(profilePicture)).secure_url;
        }
        const updatedUser = yield prisma_1.prisma.user.update({
            where: { id },
            data: Object.assign(Object.assign({}, body), { profilePicture: secure_url }),
        });
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating user:", error);
        throw new Error(error instanceof Error ? error.message : "Unexpected error");
    }
});
exports.updateUserService = updateUserService;
