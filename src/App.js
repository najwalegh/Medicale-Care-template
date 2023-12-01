import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpaceMedcin from './pages/SpaceMedcin';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medcins" element={<SpaceMedcin />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
};

export default App;
