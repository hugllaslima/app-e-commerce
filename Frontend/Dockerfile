# Use Node.js official image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY Frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY Frontend/ .

# Build the application
RUN npm run build

# Serve the application (using a simple web server)
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the port your app will run on
EXPOSE 3000
