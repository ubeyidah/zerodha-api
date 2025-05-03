import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

// config
configDotenv();
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

// routes
app.use("/api/v2/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running -> http://localhost:${port}`);
  connectDB();
});
