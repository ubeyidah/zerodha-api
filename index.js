import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import holdingRoutes from "./routes/holdingRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./utils/env.js";

// config`
configDotenv();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
const port = env("PORT", 3000);

// security
const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use(helmet());
app.use(limit);

// routes
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/holdings", holdingRoutes);
app.use("/api/v2/positions", positionRoutes);
app.use("/api/v2/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to Zerodha API! <a href='https://github.com/ubeyidah/zerodha-api'>See docs </a>",
  );
});

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
