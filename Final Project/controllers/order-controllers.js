const MenuItem = require("../models/menu-model");
const Order = require("../models/order-model");

const createOrder = async (req, res) => {
  try {
    const requestedItems = req.body.items;
    if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
      return res.status(400).json({ status: "fail", message: "Add at least one item to your order" });
    }

    const menuItems = await MenuItem.find({ _id: { $in: requestedItems.map((item) => item.menuItemId) }, available: true });
    const menuById = new Map(menuItems.map((item) => [item._id.toString(), item]));
    const items = requestedItems.map((requestedItem) => {
      const menuItem = menuById.get(String(requestedItem.menuItemId));
      if (!menuItem) throw new Error("One or more selected dishes are unavailable");
      return { menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: requestedItem.quantity };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ user: req.userId, items, total, notes: req.body.notes });

    res.status(201).json({ status: "success", message: "Order placed successfully", data: { order } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", count: orders.length, data: { orders } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "firstName lastName email").sort({ createdAt: -1 });
    res.status(200).json({ status: "success", count: orders.length, data: { orders } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: "after", runValidators: true });
    if (!order) return res.status(404).json({ status: "fail", message: "Order not found" });
    res.status(200).json({ status: "success", message: "Order status updated", data: { order } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
