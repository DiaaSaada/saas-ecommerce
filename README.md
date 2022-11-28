## Description

API for SAAS eCommerce built with NestJS, TypeScript, Postgres,..

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Developemnt

```bash
# start Postgres DB docker  continer
$ docker-compose up -d

# primsa commands
$ npx prisma --help


# fresh migrate DB (dev only)
$ npx prisma migrate dev


# create Module, Service, Controller
$ nest g module product
$ nest g service product --no-spec
$ nest g controller product
```
