import winston from "winston";
import config from "./config";

const logger = winston.createLogger({
  level: config.LOG_LEVEL || "info",

  defaultMeta: { service: "aws-sqs-produce-consumer-test" },
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
