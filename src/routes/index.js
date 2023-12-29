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
import { ConsultationsPage } from "../pages/Medecin/ConsultationsPage";
import { RenderToAssistant } from "../components/RenderToAssistant";
import AdminHome from "../pages/Assistant/homePage";
import { ConsultationServicePage } from "../pages/Assistant/ConsultationServicePage";
import UsersPage from "../pages/Assistant/UsersPage";
import { AddUserPage } from "../pages/Assistant/addUserPage";

function AppRoutes() {
  const { token } = useTokenContext();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <RenderToMedecin role={token?.user?.role}>
              <Navigate to={"/medecinPage"} />
            </RenderToMedecin>
            <RenderToAssistant role={token?.user?.role}>
              <Navigate to={"/admin"} />
            </RenderToAssistant>
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
        path="/consultations"
        element={
          <RenderToMedecin role={token?.user?.role}>
            {" "}
            <ConsultationsPage />
          </RenderToMedecin>
        }
      />

      <Route
        path="/medecinPage"
        element={
          <RenderToMedecin role={token?.user?.role}>
            <MainPage />
          </RenderToMedecin>
        }
      />
      <Route
        path="/admin"
        element={
          <RenderToAssistant role={token?.user?.role}>
            <AdminHome />
          </RenderToAssistant>
        }
      />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/services" element={<ConsultationServicePage />} />
      <Route path="/admin/new-user" element={<AddUserPage token={token} />} />
    </Routes>
  );
}

export default AppRoutes;
