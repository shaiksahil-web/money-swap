const axios = require('axios');

const API_BASE = process.env.API_GATEWAY_BASE_URL;

async function createRequest(payload) {
  const response = await axios.post(`${API_BASE}/requests`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
}

async function getRequests(type = 'NEED_CASH') {
  const response = await axios.get(`${API_BASE}/requests`, {
    params: { type }
  });
  return response.data;
}

module.exports = { createRequest, getRequests };
