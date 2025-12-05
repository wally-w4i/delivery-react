# Use a Node.js base image for building the React app
FROM oven/bun:alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json, bun.lock, and install dependencies
# Use bun install as the project uses bun.lock
COPY package.json bun.lock ./
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the React application
# Assuming 'bun run build' is the build command
RUN bun run build

# Use a lightweight Nginx image to serve the static files
FROM nginx:alpine

# Copy the Nginx configuration
# Default Nginx config usually serves /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the 'build' stage to the Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]