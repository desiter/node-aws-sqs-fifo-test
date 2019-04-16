import crypto from "crypto";
import { create } from "sqs-producer";
import { v4 as uuid } from "uuid";
import config from "./config";
import logger from "./logger";

const DEAFAULT_NUMBER_OF_GROUPS = 3;
const DEAFAULT_NUMBER_OF_MESSAGES = 10;

const producer = create({
  queueUrl: config.SQS_QUEUE_URL,
});

async function sendMessage(messageNo: number, groupNo: number) {
  return new Promise((resolve, reject) => {
    const id = uuid();
    const body = `Group #${groupNo} Message #${messageNo}`;
    const groupId = `test-group-${groupNo}`;
    const deduplicationId = crypto.createHash("md5")
      .update(`${config.TEST_DEDUPLICATION_ID_PREFIX} - ${body}`, "utf8").digest("hex");

    producer.send([{ id, body, groupId, deduplicationId }], (error: any) => {
    if (error) {
      logger.error("Failed to send a message: ", error);
      reject();
      return;
    }

    logger.info(`Group #${groupNo} Message #${messageNo} sent.`);
    resolve();
  });
});
}

const numberOfGroups = parseInt(config.TEST_NUMBER_OF_GROUPS, 10) || DEAFAULT_NUMBER_OF_GROUPS;
const numberOfMessages = parseInt(config.TEST_NUMBER_OF_MESSAGES, 10) || DEAFAULT_NUMBER_OF_MESSAGES;

async function produce() {
  for (let groupNo = 1; groupNo <= numberOfGroups; groupNo++) {
    for (let messageNo = 1; messageNo <= numberOfMessages; messageNo++) {
      await sendMessage(messageNo, groupNo);
    }
  }
}

produce();
