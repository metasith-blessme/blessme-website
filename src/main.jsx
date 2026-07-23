import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

// Prerendered routes ship real markup — hydrate it. Fall back to a fresh render if the root is empty.
const root = document.getElementById('root');
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
