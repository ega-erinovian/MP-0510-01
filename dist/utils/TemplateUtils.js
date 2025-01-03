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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEmailTemplate = loadEmailTemplate;
exports.loadForgotPasswordEmailTemplate = loadForgotPasswordEmailTemplate;
exports.formatCurrency = formatCurrency;
exports.replaceTemplateVariables = replaceTemplateVariables;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function loadEmailTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = path_1.default.join(process.cwd(), "src", "templates", "emailTemplate.html");
        return yield promises_1.default.readFile(templatePath, "utf-8");
    });
}
function loadForgotPasswordEmailTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const templatePath = path_1.default.join(process.cwd(), "src", "templates", "forgotPasswordEmail.html");
        return yield promises_1.default.readFile(templatePath, "utf-8");
    });
}
function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
}
function replaceTemplateVariables(template, data) {
    return template.replace(/{{(\w+)}}/g, (match, variable) => {
        if (variable === "totalPaid" && typeof data[variable] === "number") {
            return formatCurrency(data[variable]);
        }
        if (variable === "ifDone" || variable === "ifRejected") {
            return data.status === (variable === "ifDone" ? "DONE" : "REJECTED")
                ? data[variable]
                : "";
        }
        return (data[variable] || match).toString();
    });
}
