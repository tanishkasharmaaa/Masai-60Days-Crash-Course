const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define your custom format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info', // Log levels (error, warn, info, http, verbose, debug, silly)
  format: combine(
    timestamp(),
    colorize(),
    customFormat // Use custom format for log messages
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
    new transports.File({ filename: 'logs/combined.log' }) // Log all levels to a combined file
  ],
});

logger.exceptions.handle(
    new transports.File({ filename: 'exceptions.log' })
  );
  
  process.on('unhandledRejection', (ex) => {
    throw ex; // Let Winston handle it
  });
  

// Export the logger
module.exports = logger;
