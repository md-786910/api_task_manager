const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const logger = require('../config/logger');

const router = express.Router();

// Middleware for all /api/v1 routes
router.use((req, res, next) => {
    const username = req.body;
    const header = req.headers;
    if (header) {
        if (header["token"] === 'ashif') {
            next()
        } else {
            logger.error("Invalid request header received from client", {
                header
            })
            throw new Error('Invalid request header received from client');
        }
    } else {
        logger.error("Invalid request header received from client", {
            header
        })
        throw new Error('Invalid request header received from client');
    }
});

// Define your routes with the necessary prefix
router.use('/auth', authRoutes);
router.use('/task', taskRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
