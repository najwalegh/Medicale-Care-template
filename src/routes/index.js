import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Common/HomePage";
import Services from "../pages/Patient/servicesPage";
import SpaceMedcin from "../pages/Patient/medcinsPage";
import LoginPage from "../pages/Authentification/LoginPage";
import RegisterPage from "../pages/Authentification/RegisterPage";
import { LogoutPage } from "../pages/Authentification/LogoutPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medcins" element={<SpaceMedcin />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
