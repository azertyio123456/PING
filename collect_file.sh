#!/bin/bash

# Vérifie si un dossier a été passé en argument
if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

# Répertoire à parcourir
directory=$1

# Fichier de sortie
output_file="collected_files.txt"

# Vide le fichier de sortie s'il existe déjà
> "$output_file"

# Fonction pour parcourir le répertoire et récupérer les fichiers spécifiques
collect_files() {
  local dir=$1
  for file in "$dir"/*; do
    if [ -d "$file" ]; then
      # Si c'est un répertoire, vérifie s'il ne s'agit pas de node_modules
      if [[ "$file" != *node_modules* ]]; then
        # Appel récursif si ce n'est pas node_modules
        collect_files "$file"
      fi
    elif [[ $file == *.ts || $file == "Dockerfile" || $file == ".env" || $file == *.yml || $file == *.tsx ]]; then
      # Si c'est un fichier .ts, Dockerfile, .env ou .yml, ajoute son nom et son contenu au fichier de sortie
      echo "# $file" >> "$output_file"
      cat "$file" >> "$output_file"
      echo -e "\n" >> "$output_file"
    fi
  done
}

# Démarre la collecte des fichiers
collect_files "$directory"

echo "Tous les fichiers ont été collectés dans $output_file"