import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
//import Nav from './components/Nav';
//import Service1 from './components/Service1';
import SpaceMedcin from './pages/SpaceMedcin'
function App() {
  return (
    <div className='bg-site bg-no-repeat bg-cover overflow-hidden'>
      {/* <Header />
      <Banner />
      <Nav />
      <Service1 /> */}
      <SpaceMedcin />
    </div>
  );
}

export default App;
