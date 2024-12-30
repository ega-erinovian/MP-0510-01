"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const attendee_router_1 = __importDefault(require("./routes/attendee.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const category_router_1 = __importDefault(require("./routes/category.router"));
const city_router_1 = __importDefault(require("./routes/city.router"));
const country_router_1 = __importDefault(require("./routes/country.router"));
const coupon_router_1 = __importDefault(require("./routes/coupon.router"));
const event_router_1 = __importDefault(require("./routes/event.router"));
const referral_router_1 = __importDefault(require("./routes/referral.router"));
const review_router_1 = __importDefault(require("./routes/review.router"));
const transaction_router_1 = __importDefault(require("./routes/transaction.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const voucher_router_1 = __importDefault(require("./routes/voucher.router"));
require("./jobs/transactionCron");
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
app.use("/referrals", referral_router_1.default);
app.use("/reviews", review_router_1.default);
app.use("/attendees", attendee_router_1.default);
app.use("/users", user_router_1.default);
app.use("/auth", auth_router_1.default);
app.use("/coupons", coupon_router_1.default);
// middleware error
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.listen(config_1.PORT, () => {
    console.log(`Server running on PORT: ${config_1.PORT}`);
});
