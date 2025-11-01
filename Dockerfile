# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
# Run the development server
CMD ["npm", "run", "dev"]
