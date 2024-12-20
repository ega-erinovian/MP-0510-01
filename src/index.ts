import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config";
import cors from "cors";
import eventRouter from "./routes/event.router";
import cityRouter from "./routes/city.router";
import countryRouter from "./routes/country.router";
import voucherRouter from "./routes/voucher.router";
import categoryRouter from "./routes/category.router";
import transactionRouter from "./routes/transaction.router";
import referralRouter from "./routes/referral.router";
import reviewRouter from "./routes/review.router";
import attendeeRouter from "./routes/attendee.router";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import couponRouter from "./routes/coupon.router";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/events", eventRouter);
app.use("/cities", cityRouter);
app.use("/countries", countryRouter);
app.use("/vouchers", voucherRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);
app.use("/referrals", referralRouter);
app.use("/reviews", reviewRouter);
app.use("/attendees", attendeeRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/coupons", couponRouter);

// middleware error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
