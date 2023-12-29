import "../../App.css";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../context/AuthContextProvider";
function Home() {
  const { token } = useTokenContext();
  const description =
    "Prenez des rendez-vous médicaux en toute simplicité,consultez des professionnels qualifiés, le tout depuis chez vous.";
  const services = [
    "Facilitez votre parcours de santé",
    "Conseils médicaux",
    "Contrôlez votre bien-être",
  ];
  return (
    <div>
      <Header />
      <Banner
        token={token}
        title={"Votre santé notre priorité"}
        description={description}
        btnText={"Prendre un Rendez-Vous"}
        btnLink={"/services"}
        services={services}
      />
      {/* <Nav /> */}
      <Features />
      <Footer />
    </div>
  );
}
export default Home;
