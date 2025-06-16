// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BridgeProvider } from './contexts/BridgeContext'; // <-- Import the provider

test('renders navigation tabs', () => {
  render(
    // Wrap App with the necessary provider for the test environment
    <BridgeProvider>
      <App />
    </BridgeProvider>
  );

  // Check if a key element like the navigation or initial form is present
  // Your existing assertion might need adjustment if the default view changed,
  // but the core check for a button should be fine.
  const newRequestButton = screen.getByRole('button', { name: /New Request/i });
  expect(newRequestButton).toBeInTheDocument();

  // Example: Check for initial form title (assuming 'new-request' is default)
  // const formTitle = screen.getByRole('heading', { name: /Solana to EVM Bridge/i });
  // expect(formTitle).toBeInTheDocument();
});