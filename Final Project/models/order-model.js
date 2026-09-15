const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, max: 20 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: {
      type: [orderItemSchema],
      required: [true, "An order must contain at least one item"],
      validate: [(items) => items.length > 0, "An order must contain at least one item"],
    },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },
    notes: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
