const { sub, format } = require('date-fns');

module.exports.onePreviousDay = (date1 = new Date()) => {
    const date = new Date(date1);
    const subtractedDate = sub(date, { days: 1 });
    return format(subtractedDate, 'yyyy-MM-dd');

}
module.exports.todays = (today = new Date()) => {
    today.setUTCHours(0, 0, 0, 0);
    return today;
}
module.exports.tomorrows = (today = new Date()) => {
    today.setUTCHours(0, 0, 0, 0);
    const tomorrows = new Date(today);
    tomorrows.setUTCDate(today.getUTCDate() + 1);
    return tomorrows;
}
module.exports.yesterdays = (today = new Date()) => {
    today.setUTCHours(0, 0, 0, 0);
    const yesterdays = new Date(today);
    yesterdays.setUTCDate(today.getUTCDate() - 1);
    return yesterdays;
}


