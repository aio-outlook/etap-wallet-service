
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Pre Installation

```bash
Install Docker

https://docs.docker.com/desktop/install/mac-install/
https://docs.docker.com/desktop/install/windows-install/
https://docs.docker.com/engine/install/ubuntu/

```

```bash

Install docker compose

https://dockerlabs.collabnix.com/intermediate/workshop/DockerCompose/How_to_Install_Docker_Compose.html

```

```bash

Install node (Min: 16)

https://nodejs.org/ja/blog/release/v16.16.0
```

```bash

Install nest cli

$ npm install -g @nestjs/cli

https://docs.nestjs.com/cli/overview
```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# Copy .env.example
$  mv .env.example .env 

# Configure .env params

APP_NAME=etap-wallet
APP_ENV=development
APP_PORT=3000
DB_HOST=0.0.0.0
DB_NAME=etap-wallet
DB_USER="postgres"
DB_PASSWORD="pass"
DB_PORT=5432
REDIS_PORT=6390
RUN_MIGRATIONS=true
JWT_SECRET=secret
OPEN_EXCHANGE_RATES_URL=https://openexchangerates.org/api/

# Start App data layer dependencies
$  docker compose up  

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## App docs

```bash
# api swagger documentation
$ http://localhost:3000/api#/

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

## Stay in touch

- Author - Isaiah Adeleke

