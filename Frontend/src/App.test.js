import { render, screen } from '@testing-library/react';
import App from './App'; // Ensure App.js exists in the same directory as App.test.js

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});
