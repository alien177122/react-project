import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './src/styles/main.css';
import {initTheme} from './src/theme/initTheme';
import App from './App.tsx';

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
