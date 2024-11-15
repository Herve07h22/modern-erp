import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import App from './App';
import './index.css';

// Configuration de MobX
configure({
  enforceActions: 'never',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
