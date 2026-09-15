const express = require('express');
const Product = require('../models/Product');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'An image is required.' });
    }

    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'Name, description, price, and image are required.' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: `/uploads/${req.file.filename}`
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
