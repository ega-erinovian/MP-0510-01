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
exports.checkOldPasswordService = void 0;
const argon_1 = require("../../lib/argon");
const prisma_1 = require("../../lib/prisma");
const checkOldPasswordService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password } = body;
        const user = yield prisma_1.prisma.user.findFirst({
            where: { id },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = yield (0, argon_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return { isValid: false, message: "Password invalid" };
        }
        return { isValid: true, message: "Password valid" };
    }
    catch (error) {
        throw error;
    }
});
exports.checkOldPasswordService = checkOldPasswordService;
