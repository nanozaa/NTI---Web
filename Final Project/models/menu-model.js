const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      unique: true,
      trim: true,
      minlength: [2, "Menu item name must be at least 2 characters long"],
      maxlength: [100, "Menu item name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Menu item category is required"],
      trim: true,
      enum: {
        values: ["starter", "main course", "dessert", "beverage"],
        message: "Please provide a valid menu category",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Menu item price is required"],
      min: [0, "Price cannot be negative"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("MenuItem", menuSchema);

module.exports = MenuItem;
