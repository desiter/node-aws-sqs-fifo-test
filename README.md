# Testing Producer / Multiple Consumer pattern with AWS SQS FIFO
This project is meant to test FIFO ordering for multiple consumers.
We aim to process all messages for a given GroupID to be always processed in original consecutive order.

## Requirement
* AWS SQS FIFO queue configured with Content-Based Deduplication
* Node 10+
* Yarn

## Configuration
```sh
cp .env.example .env
```
Edit `.env` and provide SQS url and AWS credentials

## Start consumer
```sh
yarn consumer
```
