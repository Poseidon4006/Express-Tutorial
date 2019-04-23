// Create Middleware
const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} time stamp:${moment().format()}`);
    next();
};

module.exports = logger;