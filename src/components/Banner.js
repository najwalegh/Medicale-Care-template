import React from 'react'
//image
import Image from '../assets/logo.png';
// icons
// annimation
import { TypeAnimation } from "react-type-animation";
// motion
import { motion } from "framer-motion";
// variants
import {fadeIn} from '../variants'
import { Link } from 'react-router-dom';

import { fadeIn } from "../variants";
import { Link } from "react-router-dom";

function Banner({ token, title, description, btnText, btnLink, services }) {
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
              <span>{title}</span>
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
                  services[0],
                  1000,
                  services[1],
                  1000,
                  services[2],
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
              <br />
              {description}
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex max-w-max gap-x-6 items-center mb-12 mx-auto lg:mx-0"
            >
              {token && (
                <Link to={btnLink}>
                  <button className="btn btn-lg">{btnText}</button>
                </Link>
              )}
              {!token && (
                <Link to={"/sign-in"}>
                  <button className="btn btn-lg">{btnText}</button>
                </Link>
              )}
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
