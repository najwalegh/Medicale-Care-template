import { useEffect } from "react";
import AsideLoginRegister from "../../components/authentification/AsideForm";
import HeaderForm from "../../components/authentification/HeaderForm";
import LoginForm from "../../components/authentification/LoginForm";
import { useTokenContext } from "../../context/AuthContextProvider";
import { useLogin } from "../../hooks/auth/useLogin";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const { token, setToken } = useTokenContext();
  const { data, loading, error, performLogin } = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setToken(data);
      console.log("data: ", data);
      console.log("tokensss : ", token);
      navigate("/");
    }
  }, [data]);
  return (
    <>
      <Header />
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 h-screen content-baseline">
        <div className="flex flex-col md:grid-cols-1">
          <HeaderForm
            title={"SIGN-IN"}
            description={"Enter Your Information to log in"}
          />
          <LoginForm loading={loading} performLogin={performLogin} />
        </div>
        <div className="hidden md:block md:grid-cols-0">
          <AsideLoginRegister />
        </div>
      </div>
      <Footer />
    </>
  );
}
