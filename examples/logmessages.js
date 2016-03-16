'use strict';

var winston = require('winston');

// There are many ways to handle string
// formatting with logs. It will handle strings
// with util.format
winston.info('a very basic example');
winston.info('some', 'various', 'strings');
winston.info('The %s can\'t lie!', 'log');
// ES6 template literals are nice too!
var attendance = 45;
winston.info(`There were ${attendance} participants`);

// metadata will be printed to the console too
var sysStatus = { users: 50, queueLength: 5 };
winston.default.transports.console.prettyPrint = true;
winston.info('system status', sysStatus);
