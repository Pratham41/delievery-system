// ROUTER
const router = require('express').Router();

// CONTROLLERS
const { loginUser, registerNewUser } = require('../controller/user');

// MIDDLEWARES
const { protect } = require('../middleware/auth');

// ROUTES
router.route('/login').post(protect, loginUser);
router.route('/register').post(registerNewUser);

module.exports = router;
