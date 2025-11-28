// src/controllers/authController.js

async function sendOtpHandler(req, res) {
  // Do not validate anything; always succeed
  const phone = req.body.phone || 'unknown';
  console.log(`Fake send OTP to ${phone}`);

  return res.status(200).json({
    success: true,
    message: 'OTP sent (demo, always 123456)'
  });
}

async function verifyOtpHandler(req, res) {
  // Do not validate; always accept whatever comes
  const { phone, otp } = req.body;
  console.log(`Fake verify OTP ${otp} for phone ${phone}`);

  const fakeUserId = `user-${phone || 'unknown'}`;
  const token = `demo-token-${fakeUserId}`;

  return res.status(200).json({
    success: true,
    message: 'OTP verified (demo, always ok)',
    userId: fakeUserId,
    token
  });
}

module.exports = { sendOtpHandler, verifyOtpHandler };
