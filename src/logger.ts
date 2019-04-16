import winston, { format } from "winston";
import config from "./config";

const { combine, timestamp, json } = format;

const logger = winston.createLogger({
  level: config.LOG_LEVEL || "info",

  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;
