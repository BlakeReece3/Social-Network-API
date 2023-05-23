const router = require('express').Router();
const userController = require('../../controllers/user-controller');

// GET /api/users
router.get('/', userController.getAllUsers);

// POST /api/users
router.post('/', userController.createNewUser);

// GET /api/users/:userId
router.get('/:userId', userController.getUserById);

// PUT /api/users/:userId
router.put('/:userId', userController.updateUser);

// DELETE /api/users/:userId
router.delete('/:userId', userController.deleteUser);

module.exports = router;