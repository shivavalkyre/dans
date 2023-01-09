var moment = require('moment');
var util = require('util');
var momenttz = require('moment-timezone');
var crypto = require('crypto');
var winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
var fs = require('fs');
require('dotenv').config()

var timezone = process.env.TIMEZONE

var shtm = function () {
    return momenttz().tz(timezone).format('DD MMM YYYY HH:mm:ss') + ' ';
    // return moment().format('DD MMM YYYY HH:mm:ss') + ' ';
};
module.exports.shtm = shtm;

/*LOGGER*/
var options = {
    file: {
        level: 'debug',
        name: 'file.info',
        filename: process.env.LOGFILE_FOLDER,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        // maxFiles: 100,
        colorize: true,
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: process.env.LOGFILE_FOLDER,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
    dailyfile: {
        prepend: true,
        level: 'debug',
        colorize: false,
        timestamp: false,
        filename: process.env.LOGFILE_FOLDER,
        maxSize: 5242880,
        json: false,
        prettyPrint: true
    }
};

// your centralized logger object
const logger = winston.createLogger({
    transports: [
        //new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.errorFile),
        new (winston.transports.File)(options.file),
        // new (winston.transports.File)(options.file),
        new DailyRotateFile(options.file)
    ],
    exitOnError: false, // do not exit on handled exceptions
});
module.exports.logger = logger