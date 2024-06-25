#!/bin/bash
curl -X POST http://localhost:9000/api/pokemon/get -H "Content-Type: application/json" -d '{"username": "MAXIMUS"}'
