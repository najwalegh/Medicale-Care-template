import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpaceMedcin from "./pages/Patient/medcinsPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Common/HomePage";
import LoginPage from "./pages/Authentification/LoginPage";
import RegisterPage from "./pages/Authentification/RegisterPage";
import Services from "./pages/Patient/servicesPage";
import { AuthProvider } from "./context/AuthContextProvider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
