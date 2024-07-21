const cron = require('node-cron');

const task = cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});

// task start
task.start();