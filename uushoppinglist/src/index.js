import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import ListDetail from './pages/ListDetail';
import NoPage from './pages/NoPage';
import AppNavbar from './components/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from '../src/en/translation.json';
import translationCS from '../src/cs/translation.json';

// Konfigurace i18next
i18n
  .use(initReactI18next) // předá i18n instance do react-i18next
  .init({
    resources: {
      en: { translation: translationEN },
      cs: { translation: translationCS }
    },
    lng: "en", // výchozí jazyk
    fallbackLng: "en", // použije se, pokud aktuální jazyk nemá překlad
    interpolation: {
      escapeValue: false // react již escapuje hodnoty
    }
  });

function App() {
  return (
    <>
      <AppNavbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="listdetail" element={<ListDetail />} />
          <Route path="listdetail/:listId" element={<ListDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
