const MenuItem = require("../models/menu-model");

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();

    res.status(200).json({
      status: "success",
      count: menuItems.length,
      data: {
        menu: menuItems,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch menu items: ${error.message}`,
    });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const category = req.body.category?.toLowerCase();
    const newMenuItem = await MenuItem.create({
      ...req.body,
      category,
    });

    res.status(201).json({
      status: "success",
      message: "Menu item added successfully",
      data: {
        menuItem: newMenuItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        status: "fail",
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        menuItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.category) updateData.category = updateData.category.toLowerCase();

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({
        status: "fail",
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Menu item updated successfully",
      data: {
        menuItem: updatedMenuItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({
        status: "fail",
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Menu item deleted successfully",
      data: {
        menuItem: deletedMenuItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllMenuItems,
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};
