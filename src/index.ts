import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config";
import cors from "cors";
import eventRouter from "./routes/event.router";
import cityRouter from "./routes/city.router";
import countryRouter from "./routes/country.router";
import voucherRouter from "./routes/voucher.router";
import categoryRouter from "./routes/category.router";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/events", eventRouter);
app.use("/cities", cityRouter);
app.use("/countries", countryRouter);
app.use("/vouchers", voucherRouter);
app.use("/categories", categoryRouter);

// middleware error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
