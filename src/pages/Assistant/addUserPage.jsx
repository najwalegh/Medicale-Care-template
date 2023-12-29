import { useNavigate } from "react-router-dom";
import UserForm from "../../components/Admin/UserForm";
import HeaderForm from "../../components/authentification/HeaderForm";
import { useInsertUser } from "../../hooks/users/useInsertUser";
import { useState } from "react";
import { Navbar } from "../../components/Admin/Navbar";
import { SideNav } from "../../components/Admin/sideNav";

export const AddUserPage = ({ token }) => {
  const { insertUserMutation } = useInsertUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSideBar = () => setSidebarOpen(!sidebarOpen);

  const performRegister = async (formData) => {
    insertUserMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        alert("Form submitted!");
        navigate("/admin");
      },
      onError: (data) => {
        alert("Error: " + data.message);
      },
    });
  };

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
        <div className=" w-3/5 flex flex-col">
          <HeaderForm
            title={"Ajouter Un utilisateur de votre service"}
            description={"soit un medecin ou assistant de votre service"}
          />
          <UserForm
            performRegister={performRegister}
            loading={insertUserMutation.isLoading}
            service={token?.user?.service}
          />
        </div>
      </div>
    </>
  );
};
