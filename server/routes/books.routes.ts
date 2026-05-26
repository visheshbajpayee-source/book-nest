import express from "express";
import { getBookById, searchBooks } from "../controllers/books.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.get("/search", searchBooks);
router.get("/:id", getBookById);

export default router;

