import AsideLoginRegister from "../../components/authentification/AsideForm";
import HeaderForm from "../../components/authentification/HeaderForm";
import LoginForm from "../../components/authentification/LoginForm";
import { useTokenContext } from "../../context/AuthContextProvider";
import { useLogin } from "../../hooks/auth/useLogin";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setToken } = useTokenContext();
  const { loginUserMutation } = useLogin();
  const navigate = useNavigate();
  const performLogin = async (formData) => {
    loginUserMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        console.log("data login : ", data);
        setToken(data?.data);
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
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen content-baseline">
        <div className="flex flex-col ml-6 mt-6 md:grid-cols-1">
          <HeaderForm
            title={"SIGN-IN"}
            description={"Enter Your Information to log in"}
          />
          <LoginForm
            performLogin={performLogin}
            loading={loginUserMutation.isLoading}
          />
        </div>
        <div className="hidden md:block md:grid-cols-0">
          <AsideLoginRegister />
        </div>
      </div>
      <Footer />
    </>
  );
}
