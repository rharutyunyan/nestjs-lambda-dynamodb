# Architecture

- [Architecture](#architecture)
  - [`.vscode`](#vscode)
  - [`docs`](#docs)
  - [`src`](#src)
    - [`common`](#common)
      - [`errors`](#common-errors)
      - [`filters`](#filters)
      - [`logger`](#logger)
      - [`services`](#common-services)
        - [`config`](#config)
        - [`context`](#context)
        - [`http`](#http)
        - [`middlewares`](#middlewares)
    - [`contants`](#contants)
    - [`controllers`](#controllers)
    - [`database`](#database)
    - [`database-models`](#database-models)
      - [`schemas`](#schemas)
    - [`errors`](#errors)
    - [`repositories`](#repositories)
    - [`request-response-models`](#request-response-models)
    - [`services`](#services)
    - [`types`](#types)
    - [`app.module.ts`](#appmodulets)
    - [`lambda.ts`](#lambdats)
  - [`env.sample`](#envsample)
  - [`.eslintrc.json`](#eslintrcjson)
  - [`.prettierrc`](#prettierrc)
  - [`tslint.json`](#tslintjson)
  - [`serverless.yml`](#serverlessyml)

## `.vscode`

Settings and extensions specific to this project, for Visual Studio Code. See [the editors doc](editors.md#visual-studio-code) for more.

## `docs`

You found me! :wink:
A Basic documentation regarding architecture and development

## `src`

Where we keep all our source files.

### `common`

Here we store exception filters, logger setup, error configuration, context, http module, config and middlewares

#### `common-errors`

This is the place where we configure error types (e.g. application, bad request, query failed ) and error codes (e.g ERR400_1)

#### `filters`

In this folder you can find app level [exception-filters](https://docs.nestjs.com/exception-filters).

#### `logger`

A basic setup of pino logger, override of Nest.js native logger using pino and pino-http

#### `common-services`

Here we store different helper services which are needed for proper development, http, context etc.

##### `config`

Here we define setup basic config module and config class which can bes used in entire application

##### `context`

Setup of service session

##### `http`

HTTP overwritten template module for using request types 

##### `middlewares`

Here we store all middlewares used in our application

### `contants`

Here we store all constant data and constant types

### `controllers`

Here we store all controllers

### `database`

Here we store database configuration and database module which should be included in app.module.ts

### `database-models`

Here we store DynamoDB database-models

#### `schemas`

Here we store db model schemas as nested objects with type definitions

### `errors`

Here we store overwritten exceptions

### `repositories`

Here we services for working with db models only

### `request-response-models`

Here we store our Swagger request and response models, they are validated by class-validator etc

### `services`

Here we store all services to handle controller requests

### `types`

This folder contains typescript [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

### `app.module.ts`

The root application module.

### `lambda.ts`

Lambda function handler

## `env.sample`

Environment variables which will load before app start and will be stored in `process.env`,
you should copy this as .env and put APP_ENVIRONMENT one of (development, qa, staging, production, ...)

## `.eslintrc.json`

Eslint configuration file, See [the eslint doc](https://eslint.org/) for more.

## `.prettierrc`

Eslint configuration file, See [the prettier doc](https://prettier.io/docs/en/configuration.html) for more.

## `tslint.json`

Tslint configuration file, See [the tslint doc](https://palantir.github.io/tslint/) for more.

## `serverless.yml`

Serverless configuration file for AWS services and not only, See [the serverless doc](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/) for more.
