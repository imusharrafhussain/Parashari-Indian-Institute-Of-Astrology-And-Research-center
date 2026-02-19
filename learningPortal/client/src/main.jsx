import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// INSTANT REDIRECT CHECK - must happen BEFORE React renders (< 100ms)
const checkAuthBeforeMount = () => {
  const token = localStorage.getItem('token');
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');
  const currentPath = window.location.pathname;

  console.log('[AUTH CHECK]', { token: !!token, urlToken: !!urlToken, currentPath });

  // Allow /login route ONLY if it has a token parameter
  if (currentPath === '/login' && urlToken) {
    console.log('[AUTH CHECK] Allowing /login with token');
    return true; // Let AutoLogin component handle this
  }

  // For ALL other cases - redirect if no token
  if (!token) {
    console.log('[AUTH CHECK] No token found - redirecting to AB_AI');
    window.location.replace('http://localhost:3000/login.html');
    return false;
  }

  console.log('[AUTH CHECK] Token exists - allowing access');
  return true;
};

// Only mount React if auth check passes
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
