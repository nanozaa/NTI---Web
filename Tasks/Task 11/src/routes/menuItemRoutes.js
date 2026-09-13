const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid menu item ID' });
    }

    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid menu item ID' });
    }

    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid menu item ID' });
    }

    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
