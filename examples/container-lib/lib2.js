'use strict';

var winston = require('winston'),
	log = winston.loggers.get('lib2');

function sayHello() {
	log.info('Hey, it\'s lib2!');
	log.silly('jabberwocky');
}

module.exports = sayHello;
