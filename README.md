# Testing Producer / Multiple Consumer pattern with AWS SQS FIFO
This project is meant to test FIFO ordering for multiple consumers.
We aim to process all messages for a given GroupID in the original consecutive order.

## Requirement
* AWS SQS FIFO queue configured with Content-Based Deduplication
* Node 10+
* Yarn

## Configuration
```sh
cp .env.example .env
```
Edit `.env` and provide SQS url and AWS credentials

## Start producer
First start a producer and wait until it pushes all messages to SQS.
```sh
yarn producer
```
### Producer configuration in `.env`:
* `TEST_NUMBER_OF_GROUPS` - number of ordered message groups.
* `TEST_NUMBER_OF_MESSAGES` - number of messages for each group.
* `TEST_DEDUPLICATION_ID_PREFIX` - `MessageDeduplicationID` is calculated based on `${TEST_DEDUPLICATION_ID_PREFIX} - ${md5(body)}`

## Start consumer
This experiment is meant to run multiple consumers, so try run the following command in at least 2 separate console terminals.
```sh
yarn consumer
```

### Consumer options in `.env`
* `AWS_SQS_CONSUMER_BATCH_SIZE` - try with different values to observe how received batches are split between consumer and ordered in time
