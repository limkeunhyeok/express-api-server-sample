const winston = require("winston");
const WinstonDaily = require("winston-daily-rotate-file");
const path = require("path");
const { nodeEnv } = require("../config");

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = "logs";
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};
winston.addColors(colors);

const level = () => {
  const isDevelopment = nodeEnv === "development";
  return isDevelopment;
}

const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  printf((info) => {
    if (info.stack) {
      return `${info.timestamp} ${info.level}: ${info.message} \n Error Stack: ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
  })
);

const consoleOpts = {
  handleExceptions: true,
  level: nodeEnv === "production" ? "error" : "debug",
  format: combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" })
  )
};

const transports = [
  new winston.transports.Console(consoleOpts),
  new WinstonDaily({
    level: "error",
    datePattern: "YYYY-MM-DD",
    dirname: path.join(`./${logDir}`, "/error"),
    filename: "%DATE%.error.log",
    maxFiles: 30,
    zippedArchive: true
  }),
  new WinstonDaily({
    level: "debug",
    datePattern: "YYYY-MM-DD",
    dirname: path.join(`./${logDir}`, "/all"),
    filename: "%DATE%.all.log",
    maxFiles: 7,
    zippedArchive: true
  })
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format: logFormat,
  transports
});

module.exports = logger;