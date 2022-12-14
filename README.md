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
## Setup
```bash
$ npm install class-validator --save
$ npm install class-transformer --save
$ npm install --save  @nestjs/jwt @nestjs/passport passport passport-jwt
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


#DB seeder with faker  (node --loader ts-node/esm ./prisma/seed.ts)
$ npm run seed
```


