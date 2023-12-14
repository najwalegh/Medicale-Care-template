import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const MainPage = () => {
  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <Header />
      <div className="m-auto">
        <p className="p-auto">
          medecin Page Feature ! ONly if you have a role medecin
        </p>
      </div>
      <Footer />
    </div>
  );
};
