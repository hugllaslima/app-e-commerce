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
- Here is the index.html file:
  
  ```
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A simple static e-commerce store" />
    <title>Simple E-Commerce Store</title>
  </head>
  <body>
    <header>
      <h1>Simple E-Commerce Store</h1>
    </header>
    <main>
      <section>
        <h2>Products</h2>
        <ul>
          <li>
            <h3>Product 1</h3>
            <p>Price: $20</p>
            <button>Buy Now</button>
          </li>
          <li>
            <h3>Product 2</h3>
            <p>Price: $30</p>
            <button>Buy Now</button>
          </li>
          <li>
            <h3>Product 3</h3>
            <p>Price: $50</p>
            <button>Buy Now</button>
          </li>
        </ul>
      </section>
    </main>

    <footer>
      <p>&copy; 2025 Simple E-Commerce Store</p>
    </footer>
  </body>
</html>

```

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

      - name: Build application
        run: |
          cd Backend
          npm run build

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
          npm test

      - name: Build application
        run: |
          cd Frontend
          npm run build
```
- I tested the GitHub actions and ran into some errors.
- After I used capital letter 'F' to save the directory name for 'Frontend' and I used small letter 'f' for the directory name in the workflow. I made a similar mistake with the Backend too.
- 
