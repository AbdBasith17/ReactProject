import React from 'react';

const About = () => {
  return (
    <div className="relative w-full min-h-[60vh] bg-white flex items-center justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="mb-4 overflow-hidden">
          <h2 className="text-[9px] font-bold text-gray-400 tracking-[0.5em] uppercase">
            Our Essence
          </h2>
        </div>
        
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mt-2 tracking-tighter uppercase mb-8">
          PERF<span className="text-emerald-700 font-light italic tracking-tight">AURA</span>
        </h1>
        
        <div className="space-y-6">
          <p className="text-base md:text-xl text-gray-800 leading-relaxed text-justify sm:text-center font-bold tracking-tight max-w-2xl mx-auto">
            Perfaura is not just an online store, but your ultimate destination for all things fragrance-related. 
            Discover a curated collection of the finest original imported perfumes. 
          </p>

          <p className="text-xs md:text-base text-gray-500 leading-loose text-justify sm:text-center max-w-xl mx-auto font-medium">
            At Perfaura, we pride ourselves on offering the best prices possible, 
            ensuring that luxury and elegance are within reach for every fragrance enthusiast. Experience the allure of our perfumes and indulge in the essence of luxury.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-10 h-[1px] bg-emerald-800/20"></div>
          <div className="w-1 h-1 rounded-full bg-emerald-700"></div>
          <div className="w-10 h-[1px] bg-emerald-800/20"></div>
        </div>
      </div>
    </div>
  );
};

export default About;