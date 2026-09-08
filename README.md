# FulfillX

Production-style distributed order and fulfillment platform.

## Tech Stack

- Next.js
- TypeScript
- Java
- Spring Boot
- PostgreSQL
- Redis
- AWS
- Docker
- Terraform
- GitHub Actions

## Architecture

FulfillX uses a transactional outbox pattern to reliably
publish domain events.

Order payment creates an outbox event inside the same
database transaction.

A scheduled publisher sends pending events to Amazon
EventBridge.

EventBridge routes OrderPaid events to Amazon SQS.

The SQS consumer processes fulfillment events with
idempotency protection using the processed_events table.

Failed messages are retried by SQS and eventually moved
to a dead-letter queue.

## AWS Services

- Amazon EventBridge
- Amazon SQS
- Amazon SQS Dead Letter Queue
- AWS IAM

## Features

Coming soon.

## Local Development

Coming soon.