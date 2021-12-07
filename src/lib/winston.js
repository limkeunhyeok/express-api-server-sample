const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const logDirectory = "logs";
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDirectory,
      filename: "%DATE%.log",
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDirectory}/error`,
      filename: "%DATE%.error.log",
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

logger.stream = {
  write: message => {
    logger.info(message);
  }
}

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    )
  }));
}

module.exports = logger;