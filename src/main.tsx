import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TrackingPage from './TrackingPage.tsx';
import PasswordProtect from './PasswordProtect.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import TermsPage from './pages/TermsPage.tsx';
import DisclosurePage from './pages/DisclosurePage.tsx';
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
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclosure" element={<DisclosurePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
