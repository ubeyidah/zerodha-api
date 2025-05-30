import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema(
  {
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    prevClose: { type: Number, default: 100 },
    isLoss: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Holding = mongoose.model("Holding", holdingSchema);

export default Holding;
