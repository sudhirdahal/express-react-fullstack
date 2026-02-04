const User = require('../models/user.model');

// GET all users with optional search and sort
exports.getAllUsers = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = {};
        let sortOption = { createdAt: -1 }; // Default: Newest first

        // Handle search/filtering
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Handle sorting
        if (sort === 'oldest') sortOption = { createdAt: 1 };
        else if (sort === 'name_asc') sortOption = { name: 1 };
        else if (sort === 'name_desc') sortOption = { name: -1 };

        const users = await User.find(query).sort(sortOption);

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// POST create a new user
exports.createUser = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ status: 'fail', message: 'Name is required' });
        }

        const user = await User.create({ name });

        res.status(201).json({ status: 'success', data: { user } });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// DELETE a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        }

        res.status(200).json({ status: 'success', message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
