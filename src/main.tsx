import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TrackingPage from './TrackingPage.tsx';
import PasswordProtect from './PasswordProtect.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route 
          path="/tracking" 
          element={
            <PasswordProtect>
              <TrackingPage />
            </PasswordProtect>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
