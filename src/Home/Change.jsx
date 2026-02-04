import React, { useState, useEffect } from 'react';

import bg1 from './images/6-1-scaled.jpg';
import bg2 from './images/2-1-scaled.jpg';
import bg3 from './images/3-1-scaled.jpg';
import bg4 from './images/4-1-scaled.jpg';
import bg5 from './images/5-1-scaled.jpg';
import bg6 from './images/1-1-scaled.jpg';

const images = [bg1, bg2, bg3, bg4, bg5, bg6];

function Change() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* The "relative" image below acts as the anchor. 
        It forces the <div> to be the exact height of the image.
      */}
      <img 
        src={images[currentIndex]} 
        alt="Banner Anchor"
        className="w-full h-auto opacity-0" // Invisible but takes up space
      />

      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img 
            src={img} 
            alt={`Banner ${index}`}
            className="w-full h-auto block" // w-full and h-auto ensures 100% visibility
          />
        </div>
      ))}

      {/* Interactive Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-40">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full h-1 md:h-1.5 ${
              currentIndex === index 
                ? "w-6 md:w-10 bg-white shadow-md" 
                : "w-2 md:w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Change;