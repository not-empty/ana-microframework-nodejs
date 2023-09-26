# Automatic Nodejs Api

[![Latest Version](https://img.shields.io/github/v/release/kiwfy/ana-microframework.svg?style=flat-square)](https://github.com/kiwfy/ana-microframework/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

API Rest Full based in Express using mysql lib that auto generate base code for simple crud (with unit tests and feature tests)

Requires [NodeJs](https://nodejs.org/en/download/) v18.13.0.

Requires [Docker](https://docs.docker.com/get-docker/).

### Installation

(optional) Stop all other containers to avoid conflict.

```
docker stop $(docker ps -qa)
```

Create .env file

```sh
cp .env.example .env
```

Generate a new key and put in `JWT_APP_SECRET` env value

```
JWT_APP_SECRET=secret_value_here
```

Start project with Docker using [Composer](https://getcomposer.org/) tool.

```
docker-compose up --build -d
```

Using [Postman](https://www.postman.com/downloads/) to consulting the routes created and put the new routes.

```
ana-microservice.postman_collection.json
ana-microservice.postman_environment.json
```

Or you can access [Here](http://localhost:3000) in port 3000.

### Recomendations

Use this project with [MySql](https://www.mysql.com/) with no relationship keys and NOT use JOIN.

In this way you can use all database maturity with as fast as possible.

Use [Clear Linux](https://clearlinux.org/) image in your NodeJs container to get more 50% speed and 50% less memory.

### Production

The production docker is located in `docker/prod` and you can change if you want.

### Development

Want to contribute? Great!

The project using a simple code.
Make a change in your file and be careful with your updates!
**Any new code will only be accepted with all viladations.**

Using docker dev image to run all validations

```sh
docker exec ana-microservice-nodejs npm run lint
docker exec ana-microservice-nodejs npm run test
```

If you want test coverage
```sh
docker exec ana-microservice-nodejs npm run test:cover
```

Or if you need to run all validations together
```sh
docker exec ana-microservice-nodejs npm run checkallcover
```

**Not Empty Foundation - Free codes, full minds**
