# Express ANA

(optional) Stop all other containers to avoid conflict.

```sh
docker stop $(docker ps -qa)
```

Create .env file

```sh
cp .env.example .env
```

Start project with Docker using compose tool.

```sh
docker-compose up -d
```

Ensure the folder ./storage are with all rights to save log and cache

```sh
chmod -R 777 ./storage
```
