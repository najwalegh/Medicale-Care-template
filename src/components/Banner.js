
import React from "react";
//image
import Image from "../assets/logo.png";

// annimation
import { TypeAnimation } from "react-type-animation";
// motion
import { motion } from "framer-motion";
// variants

import { fadeIn } from "../variants";
import SpaceMedcin from "../pages/Patient/medcinsPage";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section
      className="min-h-[85vh] lg:min-h-[78vh] flex items-center"
      id="home"
    >
      <div className="container mx-auto ">
        <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
          <div className='flex-1 text-center font-secondary lg:text-left mt-10 '>
            <motion.h1
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[55px] font-bold leading-[0.8] lg:text-[110px] "
            >
              <span> Votre santé notre priorité</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-6 mt-4 text-[36px] lg:text-[45px] leading-[1]"
            >
              {/* <span className=' text-white mr-4'>I am a</span> */}
              <TypeAnimation
                sequence={[
                  "Facilitez votre parcours de santé",
                  1000,
                  "Conseils médicaux",
                  1000,
                  "Contrôlez votre bien-être",
                  1000,
                ]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-8 max-w-lg max-auto lg:mx-0"
            >
              Bienvenue sur <b>MHP</b> - Votre solution santé en ligne.
              <br /> Prenez des rendez-vous médicaux en toute simplicité,
              consultez des professionnels qualifiés, le tout depuis chez vous.
            </motion.p>
            <motion.div 
            variants={fadeIn('up',0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false,amount:0.7}}className='flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0'>
              <button className='btn btn-lg'>Prendre un Rendez-Vous</button>
            </motion.div>
          </div>
          {/* {image} */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px] "
          >
            <img src={Image} alt=""></img>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
