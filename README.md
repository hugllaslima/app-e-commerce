# E-Commerce-Application-CI-CD-Pipeline

I am tasked with developing and maintaining an e-commerce platform. This platform has two promary components:
1. E-Commerce API: Backend service handling product listings, user accounts, and order processing.
2. E-Commerce Frontend: A Web application for users to browse products, manage their accounts, and place orders.

The goal is to automate the integration and deployment process for both components using GitHub Actions, ensuring continous delivery and integration.
Project Tasks:

***Task 1: Project Setup***
- I created a new GitHub repository named 'E-commerce-Application-CI-CD-Pipeline'.
- Inside the repository, I created two directories: 'api' for backend and 'webapp' for frontend.

***Task 2: Initialize GitHub Actions***
- I initialized the Git repository and added the initial project structure.
- I created a '.github/workflows' directory in the repository for GitHub Actions.

***Task 3: Backend API Setup***
- In the 'api' directory, I set up a simple Node.js/Express application that handles basic e-commerce operations like product listings, user accounts, and order processing.
- Here is the code for the Backend:

```
const express = require('express');
const app = express();

// Define the root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

// Export the app for testing
module.exports = app;

// If the script is run directly, start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}
```

- I created a 'test' folder in the backend and added a test file.
- Here is the test file:

 ```
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../server'); // Adjust the path if necessary

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return 200 for the root endpoint', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Welcome to the API!');
        done();
      });
  });
});
```
- I added a 'package.json' file to the 'Backend' directotory.
- Here is the package.json for the backend:
- 
```
{
  "name": "ecommerce-backend",
  "version": "1.0.0",
  "description": "Backend for the e-commerce application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "mocha"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "chai": "^4.3.7",
    "chai-http": "^4.3.0",
    "mocha": "^10.2.0",
    "supertest": "^6.3.3"
  }
}
```

***Task 4: Frontend Web Application setup***
- In the 'webapp' directory i created a simple React application that interacts with the backend API.
- I ensured that the frontend has basic features like product listing, user login, and order placement.
- I created a 'src' folder where I placed the frontend code.
- Here is the React code for the frontend:

```
// Frontend: React App
// Filename: frontend/src/App.js

import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  useEffect(() => {
    // Fetch products on load
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleLogin = () => {
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(() => setLoggedIn(true))
      .catch((err) => alert(err.message));
  };

  const placeOrder = (productId) => {
    fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, productId }),
    })
      .then((res) => res.json())
      .then((data) => setOrderMessage(data.message))
      .catch((err) => alert('Failed to place order'));
  };

  return (
    <div>
      <h1>E-Commerce App</h1>

      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Product List</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button onClick={() => placeOrder(product.id)}>Buy</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {orderMessage && <p>{orderMessage}</p>}
    </div>
  );
}

export default App;
```
- I added a React test file to the 'src' folder.
- Here is the test files:

```
import { render, screen } from '@testing-library/react';
import App from './App'; // Ensure App.js exists in the same directory as App.test.js
import '@testing-library/jest-dom'; // Add this import

test('renders welcome message', () => {
  render(<App />);
  const headerElement = screen.getByText(/E-Commerce App/i); // Update the text matcher
  expect(headerElement).toBeInTheDocument(); // Ensure this matcher works after importing jest-dom
});
```
- I added an index.js file for the frontend.
- Here is the index.js file:
  
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming you have an App.js file

// Create a root element in the HTML and render the React app to it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
- I created a 'public' folder where I added an index.html file for the frontend.
  
***Task 5: Continuous Integration workflow***
- I wrote a GitHub Actions workflow for the backend and frontend that:
   - Installed dependencies.
   - Ran tests.
   - Builds the application.
- Here is the GitHub Action Workflow

```
name: CI/CD Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  backend:
    name: Backend CI/CD
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: |
          cd Backend
          npm install 

      - name: Run tests
        run: |
          cd Backend
          npm test


  frontend:
    name: Frontend CI/CD
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: |
          cd Frontend
          npm install

      - name: Run tests
        run: |
          cd Frontend
          npm test -- --ci --silent

      - name: Build application
        run: |
          cd Frontend
          npm run build
```
- I tested the GitHub actions and ran into some errors.
- After troubleshooting I found out that I used capital letter 'F' to save the directory name for 'Frontend' and I used small letter 'f' for the directory name in the workflow. I made a similar mistake with the Backend too.
- I fixed the issue and all test ran successfully.

***Task 6: Docker Integration***
- I created a Dockfile for the Backend and added it to the Backend folder.
- Here is the Dockerfile for the backend:
  
        ```
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
        ```
  
  - I created another Dockerfile for the Frontend and added it to the frontend folder.
  - Here is the Dockerfile for the frontend:
    
        ```
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
              ```
     - I then updated the main.yaml file of the Github action to build Docker images for frontend and backend and push them to DockerHub.
     - I added my username and Dockehub security token to 'secrets' and refrenced the secrets in the Github action to enable Github login to Dockerhub without hardcoding credentials into the code.
     - Here is the updated Github action file:
       
       ```
           name: CI/CD Workflow
    on:
      push:
        branches:
          - main
      pull_request:
        branches:
          - main
    jobs:
      backend:
        name: Backend CI/CD
        runs-on: ubuntu-latest
        steps:
          - name: Checkout code
            uses: actions/checkout@v3
          - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '16'
          - name: Install dependencies
            run: |
              cd Backend
              npm install 
          - name: Run tests
            run: |
              cd Backend
              npm test
          - name: Setup Docker Buildx
            uses: docker/setup-buildx-action@v2
          - name: Build Backend Docker image
            run: |
              docker build -t backend -f Backend/Dockerfile .
          - name: Tag Docker image for backend
            run: docker tag backend ${{ secrets.DOCKER_HUB_USERNAME }}/backend
          - name: Login to Docker Hub
            uses: docker/login-action@v2
            with:
              username: ${{ secrets.DOCKER_HUB_USERNAME }}
              password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}  
          - name: Push Backend Docker image
            run: |
              docker push ${{ secrets.DOCKER_HUB_USERNAME }}/backend
      frontend:
        name: Frontend CI/CD
        runs-on: ubuntu-latest
        steps:
          - name: Checkout code
            uses: actions/checkout@v3
          - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '16'
          - name: Install dependencies
            run: |
              cd Frontend
              npm install
          - name: Run tests
            run: |
              cd Frontend
              npm test -- --ci --silent
          - name: Build application
            run: |
              cd Frontend
              npm run build
          - name: Setup Docker Buildx
            uses: docker/setup-buildx-action@v2
          - name: Build Frontend Docker image
            run: |
              docker build -t frontend -f Frontend/Dockerfile .
          - name: Tag Docker image for frontend
            run: docker tag frontend ${{ secrets.DOCKER_HUB_USERNAME }}/frontend    
          - name: Login to Docker Hub
            uses: docker/login-action@v2
            with:
              username: ${{ secrets.DOCKER_HUB_USERNAME }}
              password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
          - name: Push Frontend Docker image
            run: |
              docker push ${{ secrets.DOCKER_HUB_USERNAME }}/frontend
       ```
       
