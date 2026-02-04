const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');

// GET /api/v1/products - Get all products (supports ?search=&sort=)
router.get('/', productController.getAllProducts);

// GET /api/v1/products/:id - Get product by ID
router.get('/:id', productController.getProductById);

// POST /api/v1/products - Create a new product (requires auth)
router.post('/', auth, productController.createProduct);

// DELETE /api/v1/products/:id - Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
