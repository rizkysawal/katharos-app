import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BibleProvider } from './context/BibleContext';
import Home from './pages/Home';
import Reader from './pages/Reader';

export default function App() {
  return (
    <BrowserRouter>
      <BibleProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<Reader />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BibleProvider>
    </BrowserRouter>
  );
}
