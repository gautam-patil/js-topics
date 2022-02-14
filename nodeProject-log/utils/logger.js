const { createLogger, format, transports } = require('winston');

if (process.env.NODE_ENV == "prod") {

  module.exports = createLogger({
    transports:[
          new transports.File({
          filename: 'logs/server.log',
          format:format.combine(
              format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
              format.align(),
              format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
          )}),
          new transports.Console({
            name: 'debug-console',
            prettyPrint: true,
            handleExceptions: true,
            json: false,
            colorize: true
          })
        ]
    });
}else{

  module.exports = createLogger({
    transports:[
          new transports.File({
          filename: 'logs/server.log',
          format:format.combine(
              format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
              format.align(),
              format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
          )}),
        ]
    });
}