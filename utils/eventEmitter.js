const EventEmitter = require("events");
const events = require("../contants/eventConstant");
const { notifyUserRegister } = require("./eventConsumer");
const logger = require("../config/logger");
const eventEmitter = new EventEmitter(); // Add parentheses here

eventEmitter.on(events.NOTIFY_USER_REGISTER, async (data) => {
    try {
        console.log({ data });
        await notifyUserRegister(data);
    } catch (error) {
        console.log({ error });
        logger.error("error in pending task", { error });
    }
});

module.exports = eventEmitter;
