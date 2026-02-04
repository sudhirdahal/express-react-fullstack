const User = require('../models/user.model');

exports.getUsersView = async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = {};
        let sortOption = { createdAt: -1 };

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (sort === 'oldest') sortOption = { createdAt: 1 };
        else if (sort === 'name_asc') sortOption = { name: 1 };
        else if (sort === 'name_desc') sortOption = { name: -1 };

        const users = await User.find(query).sort(sortOption);
        res.render('users', {
            title: 'Users',
            page_name: 'Users',
            users,
            searchTerm: search || '',
            currentSort: sort || 'newest'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.createUserForm = async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/api/v1/users/view');
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

exports.deleteUserAndRedirect = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/api/v1/users/view');
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

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

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ status: 'success', data: { user } });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

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
