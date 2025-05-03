import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import holdingRoutes from "./routes/holdingRoutes.js";

// config
configDotenv();
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;

// routes
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/holding", holdingRoutes);

//global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.name,
  });

  console.error(err.stack);
});

app.listen(port, () => {
  console.log(`Server is running -> http://localhost:${port}`);
  connectDB();
});
