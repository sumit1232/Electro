const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products?limit=8 (matches your React Homepage)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const products = await Product.find().limit(limit).sort({ createdAt: -1 });
    res.json({ products, total: await Product.countDocuments() });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/1 (single product)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/products (admin add product)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
