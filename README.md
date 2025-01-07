# E-Commerce-Application-CI-CD-Pipeline

I am tasked with developing and maintaining an e-commerce platform. This platform has two promary components:
1. E-Commerce API: Backend service handling product listings, user accounts, and order processing.
2. E-Commerce Frontend: A Web application for users to browse products, manage their accounts, and place orders.

The goal is to automate the integration and deployment process for both components using GitHub Actions, ensuring continous delivery and integration.
Project Tasks:

Task 1: Project Setup
- I created a new GitHub repository named 'E-commerce-Application-CI-CD-Pipeline'.
- Inside the repository, I created two directories: 'api' for backend and 'webapp' for frontend.

Task 2: Initialize GitHub Actions
- I initialized the Git repository and added the initial project structure.
- I created a '.github/workflows' directory in the repository for GitHub Actions.

Task 3: Backend API Setup
- In the 'api' directory, I set up a simple Node.js/Express application that handles basic e-commerce operations like product listings, user accounts, and order processing.
- Here is the code for the Backend:

  `// Backend: Node.js with Express
// Filename: backend/server.js

const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// In-memory storage for demo purposes
let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
];
let users = [
  { id: 1, username: 'user1', password: 'password1' },
];
let orders = [];

// Routes
// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// User login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Place an order
app.post('/api/orders', (req, res) => {
  const { userId, productId } = req.body;
  const product = products.find((p) => p.id === productId);
  if (product) {
    const order = { id: orders.length + 1, userId, productId };
    orders.push(order);
    res.json({ message: 'Order placed successfully', order });
  } else {
    res.status(400).json({ message: 'Invalid product ID' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});`
  

Task 4: Frontend Web Application setup
- In the 'webapp' directory i created a simple React application that interacts with the backend API.
- I ensured that the frontend has basic features like product listing, user login, and order placement. 
