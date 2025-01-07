
// Backend: Node.js with Express
// Filename: backend/API.js

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
});
