import "../../App.css";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../context/AuthContextProvider";
function Home() {
  const { token } = useTokenContext();
  return (
    <div>
      <Header />
      <Banner token={token} />
      <Features />
      <Footer />
    </div>
  );
}
export default Home;
