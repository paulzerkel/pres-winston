'use strict';

var winston = require('winston');

// we can create multiple loggers
// that can be referenced from other modules
winston.loggers.add('lib1', {
	console: {
		level: 'silly',
		colorize: true,
		label: 'lib1'
	}
});

winston.loggers.add('lib2', {
	console: {
		level: 'info',
		colorize: true,
		label: 'lib2'
	}
});
