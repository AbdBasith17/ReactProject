import React from 'react';

const About = () => {
  return (
    <div className="relative w-full min-h-screen bg-cover bg-center flex items-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-sm sm:text-base font-semibold text-gray-700 tracking-widest">ABOUT</h1>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
          PERF<span className="text-green-800">AURA</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-900 leading-relaxed text-justify sm:text-center">
          Perfaura is not just an online store, but your ultimate destination for all things fragrance-related. 
          Discover a curated collection of the finest original imported perfumes, meticulously selected to cater 
          to your unique tastes and preferences. At Perfaura, we pride ourselves on offering the best prices possible, 
          ensuring that luxury and elegance are within reach for every fragrance enthusiast. Enjoy the convenience of 
          shopping from the comfort of your home with our seamless online shopping experience, complemented by free shipping 
          on every order. Experience the allure of our perfumes and indulge in the essence of luxury with Perfaura.
        </p>
      </div>
    </div>
  );
};

export default About;
