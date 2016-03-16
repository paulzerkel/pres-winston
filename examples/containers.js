'use strict';

var config = require('./container-lib/config-winston'),
	configExample = require('./container-lib');

// these calls will log, but what appears
// is based on the code in config-winston
configExample.lib1();
configExample.lib2();
