# pres-winston
A presentation on the logging library [Winston](https://github.com/winstonjs/winston) for [node.jSTL](http://www.meetup.com/node-jSTL/).

## Overview
The presentation is built with [Reveal.js](https://github.com/hakimel/reveal.js) and hosted on GitHub Pages: http://paulzerkel.github.io/pres-winston/

Edit the root `index.html` file to change the presentation. All of the files for Reveal.js are in `/reveal`. The master branch contains the live site.

## Examples
All examples are in `/examples`. Run `npm install` to install Winston.

1. `loggers.js` - examples of using the default logger and creating custom loggers
1. `logmessages.js` - examples of logging strings, formatting, and metadata
1. `containers.js` - examples of using Winston's containers feature which is a good example of granular log control and color output

## Notes
Notes for the presentation follows.

### Title
* Node.js logging with Winston
* 3/16/2016
* This presentation will cover what logging is, why you probably want it, and how the library Winston will make logging very easy.

### Who Am I?
* My name is Paul Zerkel and I run the tech side of the local startup Manufacturers’ Inventory. We use node.js for parts of our backend systems
* I also work as a software consultant where my focus is development and system architecture.

### What is logging?
* A fact about the state of a program or system, such as what function is currently being executed, values passed into a function, responses from calls to external systems, number of items in a queue, time takes to perform an operation, etc
* Often the act of logging includes some form of storage, such as writing to a file, saving to a database, pushing to a specialized logging or monitoring system.
* The log message itself often contains useful metadata such as the time the log was generated or the severity of the message

### Why do we want it?
* Logging in QA helps developers and testers recreate errors in applications
* Logging in production can be used for “Exception Driven Development”, performance troubleshooting, and long term event tracking
* Logging in development can help developers learn how an application works and reason through a system by watching in real time

### Sounds great, but how?
* Console.log and console.error exist, but are pretty limited compared to other options
* The console object in node only handles two outputs - a standard out and an error out
* A console can be created that handles a user defined stream, but it’s up to the developer to manage those streams. ie is it a file? A network stream? Something else?
* There is no built in concept of logging levels; info is an alias to log and warn is an alias to error.

### Introducing Winston
* Per the docs: “A multi-transport async logging library for node.js.”
* Open source / MIT licensed
* Node >= 0.10.0
* Designed to have a minimal number of dependencies but it is open for extension to customize to your specific need

### Overview
* From a high level, Winston is comprised of Logs, Loggers, and Transports
  * A Log is the message that is created plus some optional metadata
  * A Logger is the object responsible for handling a log
  * A Transport is a destination for a log message - sometimes other logging frameworks call these appenders
* Winston uses these three concepts to separate the contents of a log, from the action of saving it, from where the log goes

### Levels
* Another core concept to Winston and shared with many other logging systems
* A level is a way to assign a log message a priority and also a way to further refine how log messages are processed
* When you log a message you specify a level and Transports can optionally only respond to certain levels
* Levels have a numeric value and Loggers have a level that specifies the maximum level that they will respond to
* Default: error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
* You can create your own levels but you may want to really think twice about this. The default log levels give you a fair bit of flexibility. The more levels you have the more you have to consider which one to actually use.

### Why separate the Logger (action of logging) from the Transport (destination)?
* It gives you the ability to programmatically control when a log is actually saved and how it is actually saved
* Both the Logger object and the available Transports will only act on logs that match or are more important than their current level
* Examples would be:
  * Only save certain messages in the DEV and TEST environments
  * Send all errors to a central database or monitoring system
  * Display logs on the console and save them to a file

### Loggers
* Loggers are the object that is used to actually log a message
* Winston provides a default logger and also allows you to build a custom logger
  * The default logger has a level of “Info” and only a Console transport
  * Custom loggers let you specify the level and transports
* The logger lets you specify the level but also allows you to call a method version
* Containers let you create and recall loggers
  * It’s totally fair to have many loggers in your application
* Configuring your logger based on the environment is a great idea
  * One possibility is to use node_env or other environmental variables

### Log Messages
* Log messages are strings
* Can be passed in with a util.format style
* Great use for ES6 template literals
* Messages can also contain metadata
  * Any object or a literal you create
  * How metadata is handled is dependent on the transport
    * The Transport documentation will cover how metadata is saved
    * Ex: console and file run util.inspect on the object - though docs seem a little incorrect here. Looks like it defaults to the internal serializer.
  * No need to include the time with metadata, Winston will handle that for you

### Transports
* The destination for a log message
  * The mechanism that consumes a log message
* Loggers can have one or more transports
* Transports can also have their own Level
  * A Transport’s level is the maximum it will respond to so it can filter out messages that the parent logger may otherwise pass on
  * This is optional and will just follow the logger if it is not set
* You can add in new transports to Winston
  * Core, More, and 3rd Party
  * Build your own too

### Core Transports
* The transports that Winston ships with and are built into the lib
* They are built by and supported by the Winston team
* Based on IO that is provided by Node.js
* Console
  * Similar to console.log and writes to stdout and stderr
* File
  * Persists logs to disks with lots of nice options
* HTTP
  * Generic way to send a log to an HTTP endpoint - winstond is an existing project for the server side of this
* Memory
  * Not sure why this is not mentioned in the docs, however it just saves to two in memory arrays - one for errors and other
  * Gut feeling is that this should not be used

### Winston More
* These used to be part of Winston but were removed in an effort to trim down dependencies
* These are supported by the Winston Team
* Covers many common centralized logging options
  * CouchDB
  * Redis
  * Loggly (commercial logging service)
  * Logz.io (commercial logging service based on ELK)
  * Riak
  * MongoDB 

### 3rd Party Transports
* Community contributions
* Covers many potential destinations
  * Email
  * Message queues
  * Cloud storage services
  * Databases
  * Chat services
  * Desktop notifications (Growl)
  * Windows events
* `npm search winston` to see available transports

### Extras!
* Profiling
  * If you want to profile your code, you can use the .profile method. This will start and stopped a named profiling test. When the test stops the test name and duration will be printed
* Query
  * Allows you to query Winston logs by date. The transport with the log must support it.
* Stream
  * Streams the contents of a log back. Once again, the transport must support it.

### Implementation Considerations
* Standardize when you log and how you use log levels
  * This is more important when you have > 1 developer on a project.
  * It’s frustrating when something goes wrong but critical information hasn’t been logged. This is almost guaranteed to happen, but a little thought up front can prevent many cases of this.
  * Great idea to add an overall logging strategy to your project’s readme.
  * Certainly worth pointing out how logging is being used as part of code reviews.
* How are you going to retrieve the logs?
  * If your logs are stored locally you may want to consider some method of pushing some (or all) to a central location. This could be just errors.
  * This becomes more important as the number of processes logging for a system grows.
  * Are you already using some central log storage? If so, look for an existing Winston plugin or consider writing your own.
  * Critical for Exception Driven Development
* Plan out what transports and logger / transport settings you need per environment
  * You may wish to be significantly more aggressive with logging in a development or testing environment
* Think through a purge policy early
  * It’s worth knowing how quickly the volume of logs grows
  * It’s also worth knowing how useful logs are as time goes on
  * You may need to use filters or rewriters to mask sensitive data
  * Use file writer options to save space - running out of space on a production server is never a good time!
* Beware Not Invented Here syndrome
  * There are valid reasons to build your own logger, but it’s easy to miss corner cases or lose flexibility that is already accounted for in libraries such as Winston
