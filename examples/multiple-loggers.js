'use strict';

var fs = require('fs'),
	path = require('path'),
	winston = require('winston');

// Winston will not make the log dir for you
var logPath = path.join(__dirname, '/logs');
try {
	var s = fs.statSync(logPath);
} catch(e) {
	fs.mkdirSync(logPath);
}

// Create a custom logger with two transports
// Note that the file logger has its own level!
var custom = new (winston.Logger)({
	transports:[
		new (winston.transports.Console)(),
		new (winston.transports.File)({
			filename: './logs/log.txt',
			json: false,
			level: 'warn'
		})
	],
	level: 'info'
});

custom.info('a very informational message');
custom.error('boom');
