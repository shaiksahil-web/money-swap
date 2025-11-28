const express = require('express');
const {
  registerUserHandler,
  getUserHandler,
  updateUserHandler
} = require('../controllers/userController');

const router = express.Router();

// POST /api/users
router.post('/', registerUserHandler);

// GET /api/users/:userId
router.get('/:userId', getUserHandler);

// PUT /api/users/:userId
router.put('/:userId', updateUserHandler);

module.exports = router;
