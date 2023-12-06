import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpaceMedcin from "./pages/SpaceMedcin";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContextProvider";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-pack-train">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medcins" element={<SpaceMedcin />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
