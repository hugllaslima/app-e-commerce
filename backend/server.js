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
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
}
