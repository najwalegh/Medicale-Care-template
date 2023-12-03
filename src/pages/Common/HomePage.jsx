import '../../App.css';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Nav from '../../components/Nav';
import Features from '../../components/Features';
import Footer from '../../components/Footer';
import Services from '../../pages/Patient/servicesPage';
function Home() {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      <Header />
      <Banner />
      {/* <Nav /> */}
      <Features />
      <Footer />
    </div>
  );
}
export default Home;
