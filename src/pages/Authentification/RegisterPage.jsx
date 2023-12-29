import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AsideLoginRegister from "../../components/authentification/AsideForm";
import HeaderForm from "../../components/authentification/HeaderForm";
import RegisterForm from "../../components/authentification/RegisterForm";
import { useRegister } from "../../hooks/auth/useRegister";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const { insertUserMutation } = useRegister();
  const navigate = useNavigate();

  const performRegister = async (formData) => {
    insertUserMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        alert("Form submitted!");
        navigate("/");
      },
      onError: (data) => {
        alert("Error: " + data.message);
      },
    });
  };
  return (
    <>
      <Header />
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 content-baseline">
        <div className="grid-cols-8  md:grid-cols-1 ">
          <HeaderForm title={"SIGN-UP"} description={"Fill All The field !"} />
          <RegisterForm
            performRegister={performRegister}
            loading={insertUserMutation.isLoading}
          />
        </div>
        <div className="hidden grid-cols-4 md:block md:grid-cols-0">
          <AsideLoginRegister />
        </div>
      </div>
      <Footer />
    </>
  );
}
