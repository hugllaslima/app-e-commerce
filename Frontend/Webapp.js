// Frontend: React App
// Filename: frontend/src/Webapp.js

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

