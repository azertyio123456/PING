#!/bin/bash

# Mise à jour des utilisateurs

# Utilisateur MAXIMUS
curl -X POST http://localhost:3000/api/updateuser \
-H "Content-Type: application/json" \
-d '{
    "username": "MAXIMUS",
    "email": "maximepoyet.yourpieces@outlook.fr",
    "gamification": {
        "competence": ["new_competence"],
        "gold": [50],
        "exp": [100],
        "evolution_id": 1,
        "path_image": "new/path/image",
        "lines_written": [200],
        "errors": [5],
        "victoire_defaite": [true]
    }
}'
echo

# Utilisateur Bora
curl -X POST http://localhost:3000/api/updateuser \
-H "Content-Type: application/json" \
-d '{
    "username": "Bora",
    "email": "boravanneuville.yourpieces@outlook.fr",
    "gamification": {
        "competence": ["new_competence"],
        "gold": [60],
        "exp": [80],
        "evolution_id": 1,
        "path_image": "new/path/image",
        "lines_written": [150],
        "errors": [3],
        "victoire_defaite": [true]
    }
}'
echo

# Utilisateur Daniel
curl -X POST http://localhost:3000/api/updateuser \
-H "Content-Type: application/json" \
-d '{
    "username": "Daniel",
    "email": "DanielNguessy.yourpieces@outlook.fr",
    "gamification": {
        "competence": ["new_competence"],
        "gold": [70],
        "exp": [90],
        "evolution_id": 1,
        "path_image": "new/path/image",
        "lines_written": [180],
        "errors": [4],
        "victoire_defaite": [false]
    }
}'
echo

# Utilisateur Pierre
curl -X POST http://localhost:3000/api/updateuser \
-H "Content-Type: application/json" \
-d '{
    "username": "Pierre",
    "email": "pierrenadal.yourpieces@outlook.fr",
    "gamification": {
        "competence": ["new_competence"],
        "gold": [90],
        "exp": [120],
        "evolution_id": 1,
        "path_image": "new/path/image",
        "lines_written": [250],
        "errors": [2],
        "victoire_defaite": [true]
    }
}'
echo
