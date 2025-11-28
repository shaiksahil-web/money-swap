const express = require('express');
const {
  createRequestHandler,
  listRequestsHandler
} = require('../controllers/requestController');

const router = express.Router();

// POST /api/requests
router.post('/', createRequestHandler);

// GET /api/requests
router.get('/', listRequestsHandler);

module.exports = router;
