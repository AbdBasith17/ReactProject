import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bg1 from "./images/bg1.jpg";
import bg2 from "./images/bg2.jpg";
import bg3 from "./images/bg3.jpg";
import bg4 from "./images/bg4.jpg";
import bg5 from "./images/bg5.jpg";
import bg6 from "./images/bg6.jpg";
import bg7 from "./images/bg7.jpg";
import bg8 from "./images/bg8.jpg";
import bg9 from "./images/bg9.jpg";

import bgsmall1 from "./images/bgsmall1.jpg";
import bgsmall2 from "./images/bgsmall2.jpg";
import bgsmall3 from "./images/bgsmall3.jpg";
import bgsmall4 from "./images/bgsmall4.jpg";
import bgsmall5 from "./images/bgsmall5.jpg";


const DESKTOP_SLIDES = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
const MOBILE_SLIDES = [bgsmall1, bgsmall2, bgsmall3, bgsmall4, bgsmall5];

const BackgroundSlideshow = () => {
  
  const [index, setIndex] = useState(() => 
    Math.floor(Math.random() * DESKTOP_SLIDES.length)
  );

  const interval = 8000;
  const transitionTime = 2.5;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % DESKTOP_SLIDES.length);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const variants = {
    initial: { opacity: 0, filter: "blur(20px)", scale: 1.1 },
    animate: { 
      opacity: 1, 
      filter: "blur(0px)", 
      scale: 1, 
      transition: { duration: transitionTime, ease: [0.4, 0, 0.2, 1] } 
    },
    exit: { 
      opacity: 0, 
      filter: "blur(20px)", 
      transition: { duration: transitionTime } 
    },
  };

  return (
    <div className="fixed inset-0 h-screen w-full -z-10 overflow-hidden bg-neutral-900">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={DESKTOP_SLIDES[index]}
            alt="PerfAura"
            className="hidden md:block w-full h-full object-cover object-center"
          />
          <img
            src={MOBILE_SLIDES[index % MOBILE_SLIDES.length]}
            alt="PerfAura Mobile"
            className="block md:hidden w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundSlideshow;