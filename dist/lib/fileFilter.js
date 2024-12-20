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
exports.fileFilter = void 0;
const file_type_1 = require("file-type");
const fileFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/avif",
            "image/jpg",
            "image/webp",
            "image/heif",
            "image/heic",
        ];
        for (const fieldname in files) {
            const fileArray = files[fieldname];
            for (const file of fileArray) {
                const type = yield (0, file_type_1.fromBuffer)(file.buffer);
                if (!type || !allowedTypes.includes(type.mime)) {
                    throw new Error(`File type ${type === null || type === void 0 ? void 0 : type.mime} is not allowed`);
                }
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.fileFilter = fileFilter;
