#! /usr/bin/env bash

docker load < $1
docker image ls -a

docker compose down -v --remove-orphans
docker compose up -d

docker image prune -a -f