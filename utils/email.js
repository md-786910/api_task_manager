// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
    host: "smtp.google.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },

});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        throw new Error("Error setting up transporter", error);
    } else {
        console.log('Server is ready to take our messages:', success);
    }
});

// send mail

module.exports = { transporter };
