import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.ts";
import routes from "./routes/routes.ts";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
