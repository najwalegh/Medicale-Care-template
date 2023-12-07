import "../../App.css";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../context/AuthContextProvider";
function Home() {
  const { token } = useTokenContext();
  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <Header />
      <Banner token={token} />
      {/* <Nav /> */}
      <Features />
      <Footer />
    </div>
  );
}
export default Home;
