"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const event_router_1 = __importDefault(require("./routes/event.router"));
const city_router_1 = __importDefault(require("./routes/city.router"));
const country_router_1 = __importDefault(require("./routes/country.router"));
const voucher_router_1 = __importDefault(require("./routes/voucher.router"));
const category_router_1 = __importDefault(require("./routes/category.router"));
const transaction_router_1 = __importDefault(require("./routes/transaction.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use("/events", event_router_1.default);
app.use("/cities", city_router_1.default);
app.use("/countries", country_router_1.default);
app.use("/vouchers", voucher_router_1.default);
app.use("/categories", category_router_1.default);
app.use("/transactions", transaction_router_1.default);
// middleware error
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.listen(config_1.PORT, () => {
    console.log(`Server running on PORT: ${config_1.PORT}`);
});
