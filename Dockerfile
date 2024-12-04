# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Install JSON Server globally
RUN npm install -g json-server

# Build the project for production
RUN npm run build

# Expose the ports for Nuxt and JSON Server
EXPOSE 3000 3001

# Start both Nuxt and JSON Server using a process manager
CMD ["sh", "-c", "json-server --watch db.json --port 3001 & npm run start"]
