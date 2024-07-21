const { transporter } = require("./email");

module.exports.notifyUserRegister = async (data) => {
    const { email, username } = data;
    // send mail to email
    const subject = "Registration Successful";
    const html = `
        <h1>Welcome to our platform!</h1>
        <p>Dear ${username},</p>
        <p>Thank you for registering with us. Your account has been created successfully.</p>
        <p>You can now login using your email and password.</p>
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

