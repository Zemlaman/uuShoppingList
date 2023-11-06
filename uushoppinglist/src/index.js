import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import ListDetail from './pages/ListDetail';
//import Layout from './pages/Layout';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage';
import AppNavbar from './components/navbar';

export default function App() {
  return (
    <><div>
      <AppNavbar />
    </div><BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="listdetail" element={<ListDetail />} />
            <Route path="*" element={<NoPage />} />
            <Route path="listdetail/:listId/:listName" element={<ListDetail />} />
        </Routes>
      </BrowserRouter></>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);