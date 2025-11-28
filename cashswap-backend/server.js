const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// ===== Lambda API base URLs =====
const USERS_API_BASE =
  process.env.USERS_API_BASE ||
  'https://hujj01zp2a.execute-api.us-west-1.amazonaws.com';

const REQUESTS_API_BASE =
  process.env.REQUESTS_API_BASE ||
  'https://7eb33vpxkj.execute-api.us-west-1.amazonaws.com'; // your working RequestsAPI URL

// ===== AUTH (OTP DEMO) =====

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  console.log('Fake send OTP 123456 for phone', phone);
  return res.json({ success: true });
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  if (otp !== '123456') {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  try {
    // check if user exists by phone via UsersAPI + phone-index GSI
    const url = `${USERS_API_BASE}/users/by-phone?phone=${encodeURIComponent(
      phone
    )}`;

    let isNewUser = true;
    let userId = null;

    try {
      const resp = await axios.get(url);
      if (resp.data && resp.data.user) {
        isNewUser = false;
        userId = resp.data.user.userId;
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        isNewUser = true;
      } else {
        console.error('UsersAPI by-phone error', err.message);
      }
    }

    if (!userId) {
      userId = `temp_${phone}`;
    }

    const token = `demo-token-user-${phone}`;

    return res.json({
      userId,
      token,
      isNewUser
    });
  } catch (err) {
    console.error('verifyOtp error', err);
    return res.status(500).json({ message: 'Internal error' });
  }
});

// ===== USERS PROXY =====

// Register
app.post('/api/users', async (req, res) => {
  try {
    const url = `${USERS_API_BASE}/users`;
    const resp = await axios.post(url, req.body);
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error('createUserHandler error:', err.message);
    return res
      .status(err.response?.status || 500)
      .json({ message: 'Failed to create user' });
  }
});

// Get profile
app.get('/api/users/:userId', async (req, res) => {
  try {
    const url = `${USERS_API_BASE}/users/${req.params.userId}`;
    const resp = await axios.get(url);
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error('getUserHandler error:', err.message);
    return res
      .status(err.response?.status || 500)
      .json({ message: 'Failed to get user' });
  }
});

// Update profile
app.put('/api/users/:userId', async (req, res) => {
  try {
    const url = `${USERS_API_BASE}/users/${req.params.userId}`;
    const resp = await axios.put(url, req.body);
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error('updateUserHandler error:', err.message);
    return res
      .status(err.response?.status || 500)
      .json({ message: 'Failed to update user' });
  }
});

// ===== REQUESTS PROXY =====

// Create request
app.post('/api/requests', async (req, res) => {
  try {
    const url = `${REQUESTS_API_BASE}/requests`;
    const resp = await axios.post(url, req.body);
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error('createRequestHandler error:', err.message);
    return res
      .status(err.response?.status || 500)
      .json({ message: 'Failed to create request' });
  }
});

// List requests (Need/Have Cash)
app.get('/api/requests', async (req, res) => {
  try {
    const { type } = req.query; // NEED_CASH or HAVE_CASH
    console.log('GET /api/requests type =', type);

    const url = `${REQUESTS_API_BASE}/requests`;
    const resp = await axios.get(url, { params: { type } });

    // Lambda returns { success: true, requests: [...] }
    return res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error('listRequestsHandler error:', err.message);
    return res
      .status(err.response?.status || 500)
      .json({ message: 'Failed to load requests' });
  }
});

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
