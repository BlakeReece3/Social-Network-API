const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

// GET /api/users
router.get('/', thoughtController.getAllThoughts);

// POST /api/users
router.post('/', thoughtController.createThought);

// GET /api/users/:userId
router.get('/:userId', thoughtController.getThoughtById);

// PUT /api/users/:userId
router.put('/:userId', thoughtController.updateThought);

// DELETE /api/users/:userId
router.delete('/:userId', thoughtController.deleteThought);

module.exports = router;