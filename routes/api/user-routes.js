const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// GET /api/users
router.get('/', userController.getAllUsers);

// POST /api/users
router.post('/', userController.createUser);

// GET /api/users/:userId
router.get('/:userId', userController.getUserById);

// PUT /api/users/:userId
router.put('/:userId', userController.updateUser);

// DELETE /api/users/:userId
router.delete('/:userId', userController.deleteUser);

module.exports = router;