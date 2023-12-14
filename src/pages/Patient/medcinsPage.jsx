import React from 'react';
import Banner from '../../components/medcin/Banner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLocation } from "react-router-dom";


function SpaceMedcin() {
  const location = useLocation();
  const {serviceId} =location.state ?? {serviceId : null}
  return (
    <div>
        <Header />
        <div className="container mx-auto ">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center font-secondary  mt-10 mb-6 ">
            <h1 className="text-[30px] font-leading-[0.8] lg:text-[40px] ">
              <span>Sélectionnez un médcin de votre choix</span>
            </h1>
          </div>
        </div>
      </div>
        <Banner serviceId={serviceId}/>
        <Footer />
    </div>
  );
}

export default SpaceMedcin;
