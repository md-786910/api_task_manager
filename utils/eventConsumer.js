const { transporter } = require("./email");

module.exports.notifyUserRegister = async (data) => {
    const { email, username } = data;
    // send mail to email
    const subject = "Registration Successful";
    const html = `
        <h1>Welcome to our platform!</h1>
        <p>Dear ${display_name},</p>
        <p>Thank you for registering with us. Your account has been created successfully.</p>
        <p>You can now login using your username.</p>
        <p>Best regards,</p>
        <p>Team Support</p>
    `;

    const mailObj = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html
    }
    await transporter.sendMail(mailObj);
}

module.exports.notfiyForgotPassword = async (data) => {
    const { email, username, newUsername } = data;
    // send mail to email
    const subject = "Password Reset Request";
    const html = `
        <h1>Password Reset Request</h1>
        <p>Dear ${username},</p>
        <p>We received a request to reset your password. Your new username is:</p>
        <p><strong>${newUsername}</strong></p>
        <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
        <p>Best regards,</p>
        <p>Team Support</p>
    `;

    const mailObj = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html
    }
    await transporter.sendMail(mailObj);
}

