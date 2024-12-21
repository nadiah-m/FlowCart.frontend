# Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app source code
COPY src ./src/

# Build the React app for production
RUN npm run build

# Use an Nginx image to serve the app
FROM nginx:alpine

# Copy the build artifacts from the build image to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which the app will be available
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]