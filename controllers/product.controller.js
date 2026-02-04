const Product = require('../models/product.model');

// GET all products with optional search and sort
exports.getAllProducts = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = {};
        let sortOption = { createdAt: -1 }; // Default: Newest first

        // Handle search/filtering
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Handle sorting
        if (sort === 'price_asc') sortOption = { price: 1 };
        else if (sort === 'price_desc') sortOption = { price: -1 };
        else if (sort === 'oldest') sortOption = { createdAt: 1 };

        const products = await Product.find(query).sort(sortOption);

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: { products }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }

        res.status(200).json({ status: 'success', data: { product } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// POST create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ status: 'fail', message: 'Name and price are required' });
        }

        const product = await Product.create({ name, price: Number(price) });

        res.status(201).json({ status: 'success', data: { product } });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

// DELETE a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }

        res.status(200).json({ status: 'success', message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
