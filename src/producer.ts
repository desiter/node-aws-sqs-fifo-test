import { create } from "sqs-producer";
import { v4 as uuid } from "uuid";
import config from "./config";
import logger from "./logger";

const producer = create({
  queueUrl: config.SQS_QUEUE_URL,
});

producer.send([
  {
    id: uuid(),

    body: `Hello world! Now is ${Date.now()}`,
    groupId: "test"
  }], (error: any) => {
  if (error) {
    logger.error("Failed to send message: ", error);
    return;
  }
  logger.info("Message sent.");
});
