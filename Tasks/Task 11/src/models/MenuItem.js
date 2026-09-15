const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    description: {
      type: String,
      required: [true, 'Menu item description is required'],
      trim: true,
      maxlength: 500
    },
    category: {
      type: String,
      required: [true, 'Menu item category is required'],
      enum: ['appetizer', 'main-course', 'dessert', 'beverage'],
      lowercase: true
    },
    price: {
      type: Number,
      required: [true, 'Menu item price is required'],
      min: [0, 'Price cannot be negative']
    },
    available: {
      type: Boolean,
      default: true
    },
    ingredients: {
      type: [String],
      default: []
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
