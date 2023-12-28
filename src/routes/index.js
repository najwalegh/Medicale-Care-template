import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Common/HomePage";
import Services from "../pages/Patient/servicesPage";
import SpaceMedcin from "../pages/Patient/medcinsPage";
import LoginPage from "../pages/Authentification/LoginPage";
import RegisterPage from "../pages/Authentification/RegisterPage";
import { LogoutPage } from "../pages/Authentification/LogoutPage";
import { MainPage } from "../pages/Medecin/MainPage";
import { RenderToMedecin } from "../components/RenderToMedecin";
import { useTokenContext } from "../context/AuthContextProvider";
import Consultation from "../pages/Medecin/prescription";

function AppRoutes() {
  const { token } = useTokenContext();
  console.log("token : ", token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RenderToMedecin role={token?.user?.role}>
                <Navigate to={"/medecinPage"} />
              </RenderToMedecin>
              <Home />
            </>
          }
        />
        <Route path="/medcins" element={<SpaceMedcin />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/medecinPage"
          element={
            <RenderToMedecin role={token?.user?.role}>
              <MainPage />
            </RenderToMedecin>
          }
        />
        <Route path="/step" element={<Consultation />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
