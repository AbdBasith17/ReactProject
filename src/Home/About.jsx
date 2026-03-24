import React from 'react';

const About = () => {
  return (
    /* Background and padding matched to BestSeller (w-full py-24) */
    <section className="w-full py-5 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center justify-center text-center">
        
        <div className="mb-3">
          <p className="text-[10px] font-bold text-emerald-800 tracking-[0.4em] uppercase">
            Our Essence
          </p>
        </div>
        
        {/* Heading style matched to BestSeller (3xl md:5xl font-black) */}
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

        {/* Separator matched to BestSeller (w-12 h-[2px] bg-emerald-800/20 mt-12) */}
        <div className="w-12 h-[2px] bg-emerald-800/20 mx-auto mt-12"></div>
      </div>
    </section>
  );
};

export default About;