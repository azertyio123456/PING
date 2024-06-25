#!/bin/bash

# Initialisation des utilisateurs
curl -X POST http://localhost:9000/api/init -H "Content-Type: application/json" -d '{
  "email": "maximepoyet.yourpieces@outlook.fr",
  "username": "MAXIMUS"
}'
echo

curl -X POST http://localhost:9000/api/init -H "Content-Type: application/json" -d '{
  "email": "boravanneuville.yourpieces@outlook.fr",
  "username": "Bora"
}'
echo

curl -X POST http://localhost:9000/api/init -H "Content-Type: application/json" -d '{
  "email": "DanielNguessy.yourpieces@outlook.fr",
  "username": "Daniel"
}'
echo

curl -X POST http://localhost:9000/api/init -H "Content-Type: application/json" -d '{
  "email": "pierrenadal.yourpieces@outlook.fr",
  "username": "Pierre"
}'
echo
