import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import SpaceMedcin from './pages/SpaceMedcin'
import Nav from './components/Nav';
import Services from './components/Services';
import Footer from './components/Footer';
function App() {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      {/* <Header />
      <Banner />
      <Nav />
      <Service1 /> */}
      <SpaceMedcin />
      {/* <Nav /> */}
      <Services />
      <Footer />
    </div>
  );
}

export default App;
