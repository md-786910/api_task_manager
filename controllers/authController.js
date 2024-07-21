const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../models/auth');
const { generateFromEmail } = require("unique-username-generator");
const eventEmitter = require('../utils/eventEmitter');
const events = require('../contants/eventConstant');

// Register Controller
exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    let { username, email } = req.body;
    try {
        if (!username) {
            username = generateFromEmail(
                email,
                3
            );
        }
        // Check if user exists
        let user = await auth.findOne({ $or: [{ username }, { email }] });
        if (user) {
            // return res.status(400).json({ message: 'User already exists' });
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

    const { username } = req.body;

    try {
        // Check if user exists
        let user = await Auth.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
