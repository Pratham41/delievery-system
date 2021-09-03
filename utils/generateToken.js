// JSONWEBTOKEN
const jwt = require('jsonwebtoken');

// GENERATING TOKEN
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
