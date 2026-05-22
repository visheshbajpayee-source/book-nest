import express from "express";
import { searchResources } from "../controllers/search.controller.ts";

const router = express.Router();

router.get("/", searchResources);

export default router;
