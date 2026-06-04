# Monitor Application

This application intends to provide users with ability to monitor ongoing file upload processes associated with interface type & relevant steps for each file record.
Allows user to test single record & also reprocess in case of any errors

| File or Folder               | Purpose                              |
| ---------------------------- | ------------------------------------ |
| [app](./app/)                | content for UI frontends goes here   |
| [db](./db/)                  | your domain models and data go here  |
| [srv](./srv/)                | your service models and code go here |
| [package.json](package.json) | project metadata and configuration   |
| [README.md](README.md)       | this getting started guide           |

## Getting Started

### Clone the Repo

```sh
$ git clone https://github.com/AnswerThink-AT/Aleron_Monitor.git
```

### Install Dependencie

Install the dependencies for the project. This is one-time task after clone

```sh
$ npm i
```

## Getting Ready with Hybrid

To run the application in hybrid mode by connecting to HDI container on HANA Cloud. Run following command to enable project for hybrid mode.

```sh
$ npm run setup:hybrid
```

_NOTE: Make sure you are targetting to CF org & space_

## Test the app

After Hybrid setup is done. Application can be tested in hybrid mode with following command:

```sh
$ npm run start:hybrid
```

After successful run, application should now be available at `localhost:4004`.

UI should **ALWAYS** be tested on shell during development via. URL `http://localhost:4004/$launchpad`

## Deployment to DB during development

If you make changes to data model. You would need to deploy to HDI container `monitor-db` so that changes will reflect.

```sh
$ npm run deploy:db
```

## Deployment steps

Following command cleans the directory or previous failure artifacts & build the new artifacts at `mta_archives` directory.

```sh
$ npm run build
```

Following command would use the `mta_archives/archive.tar` created in last command and deploy to CF

```sh
$ npm run deploy
```

_NOTE: Make sure you are logged in & targetting to correct CF org & space_

## Contribution Guidelines

Make sure you go through [Contribution Guidelines.md](./docs/CONTRIBUTION.md) to understand the development architecture
