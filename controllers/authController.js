const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ 
      status: "success",
      data: token });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).json({ 
        status: "success",
        data: token  });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
