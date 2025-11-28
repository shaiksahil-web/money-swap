const axios = require('axios');

const USERS_API_BASE =
  process.env.USERS_API_BASE_URL ||
  'https://hujj01zp2a.execute-api.us-west-1.amazonaws.com';

async function registerUser(payload) {
  const res = await axios.post(`${USERS_API_BASE}/users`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}

async function getUser(userId) {
  const res = await axios.get(`${USERS_API_BASE}/users/${userId}`);
  return res.data;
}

async function updateUser(userId, payload) {
  const res = await axios.put(
    `${USERS_API_BASE}/users/${userId}`,
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return res.data;
}

module.exports = { registerUser, getUser, updateUser };
