# Setup and development

- [Setup and development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
    - [Database](#database)
    - [Configuration](#configuration)
    - [Dev server](#dev-server)
  - [Generators](#generators)
  - [Run](#run)
  - [AWS](#aws)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

## Installation

```bash
# Install dependencies from package.json
yarn install
```

> Note: don't delete yarn.lock before installation

### Database

> Note: Coterie project uses [Dynamoose](https://github.com/dynamoose/dynamoose), a document oriented database in AWS (DynamoDB)

- download and setup Java Runtime Environment (JRE) version 6.x or newer [JRE](https://www.java.com/en/download/) in order to use DynamoDB locally
- `sls dynamodb install`
- `sls dynamodb start`


### Configuration

Before starting fill correct configurations in `.env` file
Please pay attention on OFFLINE_MODE variable, in order to use DynamoDB offline make i true no otherwise

```env
cp .env.example .env
```

### Dev server

> Note: If you're on Linux and see an `ENOSPC` error when running the commands below, you must [increase the number of available file watchers](https://stackoverflow.com/questions/22475849/node-js-error-enospc#answer-32600959).

```bash
# Launch the dev server
yarn dev
```

> Note: This will run serverless framework in offline mode and execute the Lambda function

## Generators

This project includes generators to speed up common development tasks. Commands include:

> Note: Make sure you already have the nest-cli globally installed

```bash
# Install nest-cli globally
yarn global add @nestjs/cli

# Generate a new service
nest generate service users

# Generate a new class
nest g class users

```
> Note: if you love generators then you can find full list of command in official [Nest-cli Docs](https://docs.nestjs.com/cli/usages#generate-alias-g).

## Serverless

if you are not familiar with [serverless](https://www.serverless.com/framework/docs) then take a look on doc

## Run

Open terminal and hit the command. That will run the application in offline mode

```bash
yarn dev
```

> Note: application will run on port 3000 (<http://localhost:3000/dev>) if it is in dev environment

### AWS

Please use AWS management console if the app is not in offline mode in order to maintain and check DynamoDB tables and Lambda functions
[aws](https://aws.amazon.com/console/)
