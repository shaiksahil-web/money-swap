const {
  registerUser,
  getUser,
  updateUser
} = require('../services/userService');

async function registerUserHandler(req, res) {
  try {
    const data = await registerUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error('registerUserHandler error:', err.message);
    const status = err.response?.status || 500;
    const body = err.response?.data || { message: 'Backend error' };
    res.status(status).json(body);
  }
}

async function getUserHandler(req, res) {
  try {
    const data = await getUser(req.params.userId);
    res.status(200).json(data);
  } catch (err) {
    console.error('getUserHandler error:', err.message);
    const status = err.response?.status || 500;
    const body = err.response?.data || { message: 'Backend error' };
    res.status(status).json(body);
  }
}

async function updateUserHandler(req, res) {
  try {
    const data = await updateUser(req.params.userId, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.error('updateUserHandler error:', err.message);
    const status = err.response?.status || 500;
    const body = err.response?.data || { message: 'Backend error' };
    res.status(status).json(body);
  }
}

module.exports = {
  registerUserHandler,
  getUserHandler,
  updateUserHandler
};
