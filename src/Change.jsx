import React, { useState, useEffect } from 'react';
import bg1 from './assets/1-1-scaled.jpg';
import bg2 from './assets/2-1-scaled.jpg';
import bg3 from './assets/3-1-scaled.jpg';
import bg4 from './assets/4-1-scaled.jpg';
import bg5 from './assets/5-1-scaled.jpg';
import bg6 from './assets/6-1-scaled.jpg';

const images = [bg1, bg2, bg3,bg4,bg5,bg6];


function Change(){
     const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(function() {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

    return(
         <div
      className="w-screen h-80  bg-cover bg-center transition-all duration-1000 ease-in-out "
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">
    
        </h1>
      </div>
    </div>
  );
};



export default Change