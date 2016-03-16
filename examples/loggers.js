'use strict';

// requiring winston returns the
// default logger
var winston = require('winston');

// these are equivalent ways to 
// log an info message
winston.log('info', 'hi node.jstl!');
winston.info('this is winston');

// it's easy to create a custom logger
// that is configured however you want
//
// this logger handles errors only
var custom = new (winston.Logger)({
	transports:[
		new (winston.transports.Console)()
	],
	level: 'error'
});
custom.warn('potential problem...');
custom.error('Really big problem!');

// you can also change the config
// of an existing logger
//
// warn messages will be logged now
custom.level = 'warn';
custom.warn('another possible issue');
