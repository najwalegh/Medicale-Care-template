import React from 'react'
import { services } from '../data/PlatformServices';
import{motion} from 'framer-motion';
import { fadeIn } from '../variants';


const Features = () => {
    return (
    <section className='min-h-[85vh] lg:min-h-[78vh] flex items-center mt-20' id='services'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          {/* {text} */}
          <motion.div
          variants={fadeIn('right',0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false, amount:0.3}}
          className='flex-1 lg:bg-services lg:bg-bottom bg-no-repeat mix-blend-lighten mb-12 lg:mb-0 flex items-center '>
            <h3 className='h3 max-w-[455px] mb-16'>Explorez nos fonctionnalités</h3>

          </motion.div>
  
          {/* {services} */}
          <motion.div
          variants={fadeIn('left',0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false, amount:0.3}}
          className='flex'>
            {/* {service list} */}
            <div>
              {services.map((service, index)=>{
                //destructure service
                const {name, description} =service;
                return(
                  <div className='border-b border-white h-[146px] mb-[38px]' key={index}>
                    <div className='max-w-[476px]'>
                      <h4 className='text-[20px] text-accent tracking-wider font-primary font-semibold mb-3'>
                        {name}
                      </h4>
                      <p className='font-secondary leading-tight text-accent/60 text-justify' >
                        {description}
                      </p>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    );
  };

export default Features
