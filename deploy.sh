#!/bin/bash
echo "--------------------------------------------------------------------"
echo "------------------------------- WINFI -------------------------------"
echo "--------------------------------------------------------------------"

echo "Pull New Changes (main)"
sleep 1
git pull origin main

echo "Stop Docker Images (Production)"
docker-compose -p winfi-api stop

echo "Build And Deploy New Docker Images (Production)"
sleep 1
docker-compose -p winfi-api up --build -d

echo "Delete Old Docker Images"
sleep 1
docker image prune -f
