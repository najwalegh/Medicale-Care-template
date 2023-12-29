import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MedecinBanner } from "../../components/doctor/MedecinBanner";
import { MedecinHeader } from "../../components/doctor/MedecinHeader";
import { useTokenContext } from "../../context/AuthContextProvider";

export const MainPage = () => {
  const { token } = useTokenContext();
  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <Header childreen={<MedecinHeader />} />
      <div className="m-auto">
        <MedecinBanner token={token} />
      </div>
      <Footer />
    </div>
  );
};
