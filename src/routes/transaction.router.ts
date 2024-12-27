import { Router } from "express";
import {
  deleteTransactionController,
  getTransactionsController,
  getTransactionsQuantityController,
  getTransactionsIncomeController,
  updateTransactionController,
  getTransactionsIncomePerMonthController,
} from "../controllers/transaction.controller";
import { validateUpdateTransaction } from "../validators/transaction.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getTransactionsController);
router.get("/filter/quantity", getTransactionsQuantityController);
router.get("/filter/income", getTransactionsIncomeController);
router.get("/filter/income-per-month", getTransactionsIncomePerMonthController);
router.patch(
  "/:id",
  verifyToken,
  validateUpdateTransaction,
  updateTransactionController
);
router.delete("/:id", verifyToken, deleteTransactionController);

export default router;
