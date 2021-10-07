#!/bin/bash
echo "--------------------------------------------------------------------"
echo "------------------------------- WINFI -------------------------------"
echo "--------------------------------------------------------------------"

echo "Pull New Changes (main or dev)"
sleep 1
git pull origin $1

echo "Stop Docker Images (Production or Development)"
docker-compose -p winfi-api stop

echo "Build And Deploy New Docker Images (Production or Development)"
sleep 1
docker-compose -p winfi-api up --build -d

echo "Delete Old Docker Images"
sleep 1
docker image prune -f
