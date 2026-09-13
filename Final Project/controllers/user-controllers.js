const User = require("../models/user-model");
const MenuItem = require("../models/menu-model");

const addMenuItemToUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const { menuItemId } = req.body;
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        status: "fail",
        message: "Menu item not found",
      });
    }

    const alreadyAdded = user.myMenuItems.some(
      (id) => id.toString() === menuItemId
    );

    if (alreadyAdded) {
      return res.status(400).json({
        status: "fail",
        message: "Menu item already added",
      });
    }

    user.myMenuItems.push(menuItemId);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Menu item added successfully to your menu",
      data: {
        myMenuItems: user.myMenuItems,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error adding menu item: ${error.message}`,
    });
  }
};

const getUserMenuItems = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("myMenuItems");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        myMenuItems: user.myMenuItems,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error fetching your menu items: ${error.message}`,
    });
  }
};

module.exports = {
  addMenuItemToUser,
  getUserMenuItems,
};
