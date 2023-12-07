import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { EffectCoverflow, Pagination ,Mousewheel} from 'swiper/modules';
import { getAllServices } from '../../api/servicesApi';



function Services(){
    const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
    <Header />
    <div className="container mx-auto ">
        <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
          <div className='flex-1 text-center font-secondary  mt-10 mb-6 '>
            <h1 className='text-[30px] font-leading-[0.8] lg:text-[40px] '>
                <span>Sélectionnez le service de votre choix</span>
            </h1>
          </div>
        </div>
    </div>
    <Swiper
      direction={'horizontal'}
      spaceBetween={20}
      mousewheel={true}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 20,
        stretch: 20,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Pagination,Mousewheel]}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
      style={{
        width: '100%',
        paddingTop: '50px',
        paddingBottom: '50px'}}>
        {services.map((service,index) => (
            <SwiperSlide key={`${service.id}-${index}`}className='bg-cart bg-no-repeat bg-cover overflow-hidden rounded border-double border-4 border-indigo-200'
              style={{
              width:'300px', height:'300px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
              }} 
            >
                <h1 className='uppercase underline underline-offset-8 pb-6'>{service.name}</h1>
                <p className="text-center text-base pb-3">{service.description}</p>
                <button className="btn-sm bg-accent text-base px-4 py-2 rounded-full">Voir plus</button>
            </SwiperSlide>
        ))}
    </Swiper>
    <Footer />
    </>
  );
};
export default Services;