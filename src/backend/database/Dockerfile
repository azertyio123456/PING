# Stage 1: Build the application
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile

# Stage 2: Setup the runtime environment
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/app.js"]
