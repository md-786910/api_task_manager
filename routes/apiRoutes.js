const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();



// Apply middleware to all routes except /user
router.use((req, res, next) => {
    if (!/^\/user/.test(req.path)) {
        return authMiddleware(req, res, next);
    }
    next();
});

// Define your routes with the necessary prefix
router.use('/user', authRoutes);
router.use('/task', taskRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
