const jwt = require('jsonwebtoken');
const auth = require('../models/auth');
const { generateFromEmail } = require("unique-username-generator");
const eventEmitter = require('../utils/eventEmitter');
const events = require('../contants/eventConstant');

exports.forgotPassword = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: "invalid request" });
    }
    const credential = req.body.credential;
    try {
        // Check if user exists
        let user = await auth.findOne({ $or: [{ email: credential }, { username: credential }] });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Generate random username;
        let username = generateFromEmail(
            user.email,
            3
        );
        // Update user with new username
        const newUsername = user.username;
        user.username = username;
        const newUser = await user.save();
        newUser.newUsername = newUsername;
        // fire event for new username
        eventEmitter.emit(events.FORGOT_USERNAME, newUser);
        res.status(201).json({ user });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: err
        });
    }
}

// Register Controller
exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    let { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    try {
        if (!username) {
            username = generateFromEmail(email, 3);
        }
        // Check if user exists
        let user = await auth.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new auth({ username, email });
        // Save user
        await user.save();

        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = await jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: '30d' },

        );
        // fire event
        eventEmitter.emit(events.NOTIFY_USER_REGISTER, user)
        res.status(201).json({ user, token });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err
        });
    }
};

// Login Controller
exports.login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "invalid request" });
    }
    const credential = req.body.credential;
    try {
        // Check if user exists
        let user = await auth.findOne({ $or: [{ email: credential }, { username: credential }] });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = await jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: '30d' });

        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err
        });
    }
};
