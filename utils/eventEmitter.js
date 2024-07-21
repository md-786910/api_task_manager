const EventEmitter = require("events");
const events = require("../contants/eventConstant");
const { notifyUserRegister, notfiyForgotPassword } = require("./eventConsumer");
const logger = require("../config/logger");
const eventEmitter = new EventEmitter(); // Add parentheses here

eventEmitter.on(events.NOTIFY_USER_REGISTER, async (data) => {
    try {
        await notifyUserRegister(data);
    } catch (error) {
        console.log({ error });
        logger.error("error in NOTIFY_USER_REGISTER", { error });
    }
});

eventEmitter.on(events.FORGOT_USERNAME, async (data) => {
    try {
        await notfiyForgotPassword(data);
    } catch (error) {
        console.log({ error });
        logger.error("error in FORGOT_USERNAME ", { error });
    }
});

module.exports = eventEmitter;
