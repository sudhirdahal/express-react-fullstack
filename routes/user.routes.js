const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET /api/v1/users - Get all users (supports ?search=&sort=)
router.get('/', userController.getAllUsers);

// GET /api/v1/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /api/v1/users - Create a new user
router.post('/', userController.createUser);

// DELETE /api/v1/users/:id - Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
