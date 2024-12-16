import { Router } from "express";
import { getTransactionsController } from "../controllers/transaction.controller";

const router = Router();

router.get("/", getTransactionsController);

export default router;
