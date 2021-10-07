#!/bin/bash
echo "--------------------------------------------------------------------"
echo "------------------------------- WINFI -------------------------------"
echo "--------------------------------------------------------------------"

echo "Move to the required branch"
sleep 1
git checkout $1

echo "Pull New Changes"
sleep 1
git pull origin $1

echo "Stop Docker Images"
docker-compose -p winfi-api stop

echo "Build And Deploy New Docker Images"
sleep 1
docker-compose -p winfi-api up --build -d

echo "Delete Old Docker Images"
sleep 1
docker image prune -f
