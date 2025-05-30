import mongoose from "mongoose";
import { env } from "../utils/env";

const connectDB = async () => {
  try {
    await mongoose.connect(env("MONGO_URI"), {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB error: -> " + error);
    process.exit(1);
  }
};

export default connectDB;
