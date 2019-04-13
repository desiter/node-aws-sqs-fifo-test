import { Consumer } from "sqs-consumer";
import config from "./config";
import logger from "./logger";

const consumer = Consumer.create({
  queueUrl: config.SQS_QUEUE_URL,

  handleMessage: async (message) => {
    logger.info("receiver message", message);
  },
});

consumer.on("error", (err) => {
  logger.error(err.message);
});

consumer.on("processing_error", (err) => {
  logger.error(err.message);
});

consumer.start();
