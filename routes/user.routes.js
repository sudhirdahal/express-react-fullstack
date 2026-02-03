const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// This handles GET /users/
router.get('/', userController.getAllUsers);

// This handles GET /users/:id
router.get('/:id', userController.getUserById);

// This handles POST /users/
router.post('/', userController.createUser);

// This handles DELETE /users/:id
router.delete('/:id', userController.deleteUser);

module.exports = router;







/* const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.send('User Profile Page');
})

module.exports = router; */