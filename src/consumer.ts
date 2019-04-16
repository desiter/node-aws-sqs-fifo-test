import { Consumer } from "sqs-consumer";
import config from "./config";
import logger from "./logger";

const DEFAULT_SQS_BATCH_SIZE = 1;

const consumer = Consumer.create({
  batchSize: parseInt(config.AWS_SQS_CONSUMER_BATCH_SIZE, 10) || DEFAULT_SQS_BATCH_SIZE,
  queueUrl: config.SQS_QUEUE_URL,

  handleMessage: async (message) => {
    logger.info(`receiver message: ${message.Body}`);
  },
});

consumer.on("error", (err) => {
  logger.error(err.message);
});

consumer.on("processing_error", (err) => {
  logger.error(err.message);
});

consumer.start();
