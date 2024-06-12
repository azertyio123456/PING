# Utilise une image officielle Node.js comme base
FROM node:16

# Crée et change dans le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copie le package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Compile les fichiers TypeScript en JavaScript
RUN npm run compile


# Expose le port sur lequel l'application va fonctionner
EXPOSE 9000

# Démarre l'application
CMD ["node", "dist/app.js"]
