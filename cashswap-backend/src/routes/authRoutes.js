// src/routes/authRoutes.js
const express = require('express');
const {
  sendOtpHandler,
  verifyOtpHandler
} = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/send-otp
router.post('/send-otp', sendOtpHandler);

// POST /api/auth/verify-otp
router.post('/verify-otp', verifyOtpHandler);

module.exports = router;
