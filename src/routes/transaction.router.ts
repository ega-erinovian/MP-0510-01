import { Router } from "express";
import {
  deleteTransactionController,
  getTransactionsController,
  updateTransactionController,
} from "../controllers/transaction.controller";
import { validateUpdateTransaction } from "../validators/transaction.validator";

const router = Router();

router.get("/", getTransactionsController);
router.patch("/:id", validateUpdateTransaction, updateTransactionController);
router.delete("/:id", deleteTransactionController);

export default router;
