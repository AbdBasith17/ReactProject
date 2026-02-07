import React from 'react';

const About = () => {
  return (
    <section className="relative w-full bg-white flex items-center justify-center px-6 py-24 lg:py-32">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="mb-6">
          <h2 className="text-[10px] font-bold text-emerald-800 tracking-[0.5em] uppercase">
            Our Essence
          </h2>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-10">
          PERF<span className="text-emerald-700 font-light italic tracking-tight">AURA</span>
        </h1>
        
        <div className="space-y-8">
          <p className="text-lg md:text-2xl text-gray-800 leading-snug text-center font-bold tracking-tight max-w-2xl mx-auto">
            Perfaura is your ultimate destination for all things fragrance-related. 
            Discover a curated collection of the finest original imported perfumes. 
          </p>

          <p className="text-sm md:text-lg text-gray-500 leading-relaxed text-center max-w-xl mx-auto font-medium opacity-90">
            We pride ourselves on offering the best prices possible, 
            ensuring that luxury and elegance are within reach for every fragrance enthusiast. 
            Indulge in the essence of luxury.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-16">
          <div className="w-16 h-[1px] bg-gray-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-700"></div>
          <div className="w-16 h-[1px] bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default About;