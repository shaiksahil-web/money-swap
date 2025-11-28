const { createRequest, getRequests } = require('../services/apiGatewayService');

async function createRequestHandler(req, res) {
  try {
    const data = await createRequest(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error('createRequestHandler error:', err.message);
    const status = err.response?.status || 500;
    const body = err.response?.data || { message: 'Backend error' };
    res.status(status).json(body);
  }
}

async function listRequestsHandler(req, res) {
  try {
    const type = req.query.type || 'NEED_CASH';
    const data = await getRequests(type);
    res.status(200).json(data);
  } catch (err) {
    console.error('listRequestsHandler error:', err.message);
    const status = err.response?.status || 500;
    const body = err.response?.data || { message: 'Backend error' };
    res.status(status).json(body);
  }
}

module.exports = { createRequestHandler, listRequestsHandler };
