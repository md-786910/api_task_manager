// Middleware function
const jwt = require('jsonwebtoken');
module.exports.authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (header) {
            const parts = header.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                const token = parts[1];
                const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
                if (verifyToken) {
                    req.user = verifyToken.user;
                    return next();
                }
            }
        }
        throw new Error('Invalid request header received from client');
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invalid JWT token' });
    }
};
