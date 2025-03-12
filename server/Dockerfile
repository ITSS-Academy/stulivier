# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . .

# Remove existing node_modules
RUN rm -rf node_modules
# Install dependencies in the root folder
RUN npm install

# Set the working directory to the db folder and install dependencies
WORKDIR /app/db
RUN rm -rf node_modules
RUN npm install

# Set the working directory back to the root folder
WORKDIR /app

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]