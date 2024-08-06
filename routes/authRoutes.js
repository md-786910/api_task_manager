const { login, register, forgotPassword } = require('../controllers/authController');

const authRoutes = require('express').Router();

authRoutes
    .route("/register")
    .post(register)
authRoutes.route("/login").post(login)
authRoutes.route("/forgot-password").post(forgotPassword)

module.exports = authRoutes;