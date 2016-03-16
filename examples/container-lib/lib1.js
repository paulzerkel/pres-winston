'use strict';

var winston = require('winston'),
	log = winston.loggers.get('lib1');

function sayHello() {
	log.info('Hi from lib1!');
	log.debug('debugging is fun');
}

module.exports = sayHello;
