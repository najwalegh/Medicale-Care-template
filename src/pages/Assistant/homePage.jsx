import { useState } from "react";
import { useTokenContext } from "../../context/AuthContextProvider";
import { Navbar } from "../../components/Admin/Navbar";
import { SideNav } from "../../components/Admin/sideNav";
import AppRoutes from "../../routes";
import { Route, Routes } from "react-router-dom";
import { RenderToAdmin } from "../../components/RenderToAssistant";
import UsersPage from "./UsersPage";
import ServicesPage from "./ServicesPage";
import { AddUserPage } from "./addUserPage";
import { ConsultationServicePage } from "./ConsultationServicePage";
import Footer from "../../components/Footer";

function AdminHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSideBar = () => setSidebarOpen(!sidebarOpen);
  const { token } = useTokenContext();
  return (
    <>
      <div>
        <Navbar
          user={token?.user}
          sidebarOpen={sidebarOpen}
          handleSideBar={handleSideBar}
          setSidebarOpen={setSidebarOpen}
        />
        <SideNav isSidebarCollapsed={sidebarOpen} />
      </div>
      <div
        className={`flex items-center justify-center w-4/5 h-3/2 m-auto text-center pt-20 pb-16 transition-transform sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <UsersPage />
      </div>
      <Footer />
    </>
  );
}
export default AdminHome;
