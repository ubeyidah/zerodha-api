import mongoose from "mongoose";
import { env } from "../utils/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env("MONGO_URI"), {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
