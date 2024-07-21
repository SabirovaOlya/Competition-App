## Use an official Node.js runtime as a parent image
#FROM node:14
#
## Set the working directory to /app
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#ARG REACT_APP_API_URL
#ENV REACT_APP_API_URL=$REACT_APP_API_URL
#RUN npm run build
#
#RUN npm install -g serve
#
#EXPOSE 3010

# Serve the React app
#CMD ["serve", "-s", "build"]

# Stage 1: Build the React application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Use ARG for build-time environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the application
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Copy the built app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/competetion.kyokushin-kan.conf /etc/nginx/competetion.kyokushin-kan.conf

# NGINX listens on port 80 by default
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
