const express = require('express');
const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Define the root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

// Products endpoint
app.get('/api/products', (req, res) => {
  res.status(200).json({
    products: [
      { 
        id: 1, 
        title: 'Smartphone Premium', 
        price: 599, 
        rating: 4.5,
        thumbnail: 'https://via.placeholder.com/300x300/4F46E5/white?text=Phone',
        category: 'Electronics',
        description: 'Latest smartphone with advanced features',
        discountPercentage: 10,
        stock: 50
      },
      { 
        id: 2, 
        title: 'Wireless Headphones', 
        price: 199, 
        rating: 4.2,
        thumbnail: 'https://via.placeholder.com/300x300/7C3AED/white?text=Headphones',
        category: 'Electronics',
        description: 'High-quality wireless headphones',
        discountPercentage: 15,
        stock: 30
      },
      { 
        id: 3, 
        title: 'Gaming Laptop', 
        price: 1299, 
        rating: 4.8,
        thumbnail: 'https://via.placeholder.com/300x300/059669/white?text=Laptop',
        category: 'Computers',
        description: 'Powerful gaming laptop for professionals',
        discountPercentage: 5,
        stock: 15
      }
    ]
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Login failed' });
  }
});

// Orders endpoint
app.post('/api/orders', (req, res) => {
  const { userId, productId } = req.body;
  if (userId && productId) {
    res.status(200).json({ message: `Order placed for product ${productId}` });
  } else {
    res.status(400).json({ message: 'Invalid order data' });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Export the app for testing
module.exports = app;

// If the script is run directly, start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}

});
