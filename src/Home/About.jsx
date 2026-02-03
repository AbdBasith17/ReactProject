import React from 'react';

const About = () => {
  return (
    /* Restored original min-h-screen height */
    <div className="relative w-full min-h-screen bg-white flex items-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Luxury tracking restored from admin reference */}
        <h2 className="text-sm sm:text-base font-bold text-emerald-800 tracking-[0.4em] uppercase mb-4">ABOUT</h2>
        
        {/* Restored original text-5xl size */}
        <h1 className="text-2xl sm:text-4xl md:text-4xl font-black text-gray-900 mt-2 tracking-tighter uppercase ">
          PERF<span className="text-emerald-700 font-light tracking-[0.1em] not-italic">AURA</span>
        </h1>
        
        {/* Restored original text-xl size and leading */}
        <p className="mt-8 text-base sm:text-lg md:text-lg text-gray-800 leading-relaxed text-justify sm:text-center font-medium italic">
          Perfaura is not just an online store, but your ultimate destination for all things fragrance-related. 
          Discover a curated collection of the finest original imported perfumes, meticulously selected to cater 
          to your unique tastes and preferences. 
        </p>
        <p className="mt-6 text-base sm:text-lg md:text-lg text-gray-600 leading-relaxed text-justify sm:text-center">
          At Perfaura, we pride ourselves on offering the best prices possible, 
          ensuring that luxury and elegance are within reach for every fragrance enthusiast. Enjoy the convenience of 
          shopping from the comfort of your home with our seamless online shopping experience, complemented by free shipping 
          on every order. Experience the allure of our perfumes and indulge in the essence of luxury with Perfaura.
        </p>

        {/* Brand decorative line */}
        <div className="w-24 h-[1px] bg-emerald-800 mx-auto mt-12 opacity-30"></div>
      </div>
    </div>
  );
};
export default About;