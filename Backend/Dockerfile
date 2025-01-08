# Use Node.js official image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY Backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY Backend/ .

# Expose the port your app will run on
EXPOSE 3001

# Command to start the app
CMD ["npm", "start"]
