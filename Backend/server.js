import express from 'express';

const app = express();

// Define the root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!' });
});

export default app;
