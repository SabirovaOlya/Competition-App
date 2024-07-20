# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app with environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Install serve to serve the React app
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build"]
