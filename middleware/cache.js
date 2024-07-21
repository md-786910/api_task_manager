const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 5 * 60 })

function getUrlFromRequest(req) {
}

function set(req, res, next) {
}

function get(req, res, next) {
}

function clear(req, res, next) {
    cache.keys(function (err, keys) {
        if (!err) {
            let resourceUrl = req.baseUrl;
            const resourceKeys = keys.filter(k => k.includes(resourceUrl));
            cache.del(resourceKeys);
        }
    });
    return next();
}

module.exports = { get, set, clear }