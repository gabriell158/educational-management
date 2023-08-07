<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project was made with [NestJS](https://github.com/nestjs/nest) framework, along with [TypeScript](https://www.typescriptlang.org/).

## Getting Started
You can run this app as a Docker container or directly in your machine. On both instances, you need to create a .env file in the project root directory analogue to the .env.example(also in the root directory).
Some environment variables explanations:
- API_PORT - The port on which the HTTP Server will run and expose the REST API. Ensure it is available.
- [REQ_RES_API_URL](https://reqres.in/) - The URL for requesting some user data. Set it to the same in .env.example.
- DATABASE_URL - The SQL database connection string. You need to specify all the parameters for the connection in this string, despite the databse port and password having their own variables. If running with the provisioned docker-compose.yml file contained in the project, the database is PostgreSQL. If you would like to use another database, you have to change the schema.prisma file and choose another supported database. NoSQL databases are not supported in this application.
- DB_PORT - Port for expose in docker. Not required if running locally.
- DB_PASSWORD - Port for expose in docker. Not required if running locally.
- RABBITMQ_HOST - Host for the RabbitMQ Broker.
- RABBITMQ_MAIN_PORT - Port for the RabbitMQ Broker. If using the docker-compose.yml file in the project, this is also the port exposed from the container.
- RABBITMQ_CONSOLE_PORT - Port for the RabbitMQ Broker Console. If using the docker-compose.yml file in the project, this is also the port exposed from the container. Only required if you wish to access the console.
- RABBITMQ_USER - Username of the RabbitMQ Broker. If using the docker-compose.yml file in the project, this is also the username of the broker runnning the container.
- RABBITMQ_PASSWORD - Password of the RabbitMQ Broker. If using the docker-compose.yml file in the project, this is also the password of the broker running in the container.
- SECRET - The secret used to sign the JWT used to authenticate requests.

If you are not running the app with the provisioned docker-compose.yml, ensure there is a RabbitMQ Broker and a database available for connection, otherwise the application won't be able to start properly.


# Docker

## Prerequisites

- Docker: v24+ 
Ensure you have Docker installed on your system. You can download Docker from the official website: https://www.docker.com/get-started
- Docker Compose plugin: It is recomended to have the Compose plugin installed as well for a better experience. You can download Docker Compose Plugin from the official website: https://docs.docker.com/compose/install/

## Running the app on Docker with compose plugin

```bash
$ docker compose up
```

# Local Machine

## Prerequisites
- [NodeJS](https://nodejs.org/en) v18+
- [Yarn](https://yarnpkg.com/) v1.22+

## Installation

```bash
$ yarn install
```

## Running the app on your local machine

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## What this application do

This app is a backend microsservice for managing the courses, students and activities of an organization. With this app you can create, read, update and delete users, courses, activities and files. Only users with the admin role can create courses and users. It is possible to upload several files (one at a time) for each activity, and download(one or all) the files for said activity. Each time an activity is created, it will publish a message in two notification queues: one for the push notification and one for the email. Following the microsservice architecture, there should the another application to consume these queues and send to each destination. However, the beggining of these functions have been implemented, in the messaging module.

This app also requires the users to be authenticated to use any of its resources(besides /health endpoint). There is no endpoit to authenticate users, however. Since the purpose of this service is not to manage user authentication, there should be another microsservice for that. For that reason, this app does not save information required for login, like email and password.


If you wish to test the endpoints with authentication, you can use an API testing tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) that allows signing a JWT Bearer token, or in the JWT [website](https://jwt.io/).


If you wish to test the endpoints guarded by the admin role, pass the following payload of the JWT. 
```json
{ "role" : "admin" }
```

## TODOS

- Fix and finish unit tests.
- Seed the database.
- Add migration section on this file.
- Add Swagger.
- Save the files on S3 instead of on disk.
- Implement SES for email notification.
- Avoid writing the .zip file on disk when downloading several files.
- Use caching to save the avatar images.
- Implement the 'teacher' role and guard non-student endpoints.
- Implement integration tests.
- Implement end-to-end test.

## License

Nest is [MIT licensed](LICENSE).
