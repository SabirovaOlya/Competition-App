# Builder stage (Node.js Alpine)
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the builder stage
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Nuxt.js application
RUN npm run build


# Final stage (Nginx)
FROM nginx:alpine

# Copy the built Nuxt.js app from the builder stage to the Nginx stage
RUN apk update && apk upgrade && \
    apk add --no-cache nodejs npm

COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port (Nginx uses port 80 by default)
EXPOSE 81

# Start Nginx
#CMD ["node","/usr/share/nginx/html/server/index.mjs"]
