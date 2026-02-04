import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import backgroundImage from "./images/bging1.jpg"; 

// Sub-components
import BestSellers from "./BestSellers";
import About from "./About";
import Change from "./Change";

const Home = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full">
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-screen w-full">
        <div className="fixed inset-0 h-screen w-full -z-10">
          <img 
            src={backgroundImage} 
            alt="Perfaura Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="h-full w-full flex flex-col justify-end md:justify-center items-start px-6 md:px-20 pb-20 md:pb-0">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="backdrop-blur-xl text-white p-8 md:p-12 rounded-3xl max-w-xs md:max-w-xl border border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl md:text-4xl leading-tight font-black mb-4 uppercase tracking-tighter">
              EVERY FRAGRANCE TELLS A STORY,<br />
              LET YOURS BEGIN WITH PERF
              <span className="text-emerald-400 font-light italic tracking-tight">AURA</span>.
            </h2>
            
            <p className="text-sm md:text-base mb-8 opacity-80 font-medium tracking-wide">
              We want you to express yourself through a deeply sensorial experience.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 font-medium text-neutral-200 transition-all duration-500 hover:w-64 cursor-pointer bg-emerald-950/40 backdrop-blur-md">
                <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-300 group-hover:-translate-x-3 group-hover:opacity-100 text-[10px] tracking-[0.2em] uppercase font-bold">
                  <Link to="/productpage">Explore The Art Of Perfumes</Link>
                </div>
                <div className="absolute right-3.5">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-5 w-5">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="relative z-10 bg-white">
        
        {/* SECTION: NEW FRAGRANCE (Tighter layout + Scroll Motion) */}
        <section className="py-16 md:py-24 px-6 lg:px-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageReveal}
              className="relative h-[350px] md:h-[500px] w-full"
            >
              <div className="w-full h-full overflow-hidden rounded-sm shadow-lg bg-gray-50">
                <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt="Model" />
              </div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -right-4 -bottom-6 w-1/2 aspect-[3/4] border-[8px] border-white shadow-2xl overflow-hidden"
              >
                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000" className="w-full h-full object-cover" alt="Product" />
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-5 lg:pl-10"
            >
              <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-emerald-800">Essence of Luxury</span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
                The New <br/> 
                <span className="luxury-text text-emerald-700 italic font-light lowercase tracking-normal">Fragrance</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm italic">
                "We want you to express yourself through a deeply sensorial experience. Scents that linger and define your aura."
              </p>
              <button className="bg-black text-white px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-emerald-900 transition-all duration-300">
                Shop Collection
              </button>
            </motion.div>
          </div>
        </section>

        {/* BEST SELLERS (No title here, handled by component) */}
        <div className="my-10">
          <BestSellers />
        </div>

        {/* SECTION: INSTINCTIVE (Tighter layout + Reverse Motion) */}
        <section className="py-16 md:py-24 px-6 lg:px-24 bg-[#fafafa]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1 space-y-6 lg:pr-10"
            >
               <span className="text-[10px] tracking-[0.4em] font-bold text-emerald-800 uppercase">Modern Classics</span>
               <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase leading-[0.9] tracking-tighter">
                 Instinctive <br/> 
                 <span className="luxury-text text-emerald-700 italic font-light lowercase tracking-normal">& Electric</span>
               </h2>
               <p className="text-gray-400 text-xs md:text-sm tracking-widest max-w-sm font-medium">
                 A blend of citrus and deep musk designed for the modern individual who seeks to stand out.
               </p>
               <Link to="/productpage" className="group inline-flex items-center gap-2 border-b-2 border-emerald-800 pb-1 text-[10px] font-bold uppercase tracking-[0.3em]">
                 Discover More
                 <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
               </Link>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="h-[300px] md:h-[500px] overflow-hidden rounded-sm shadow-xl order-1 lg:order-2"
            >
               <img 
                 src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=1000" 
                 className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" 
                 alt="Lifestyle" 
               />
            </motion.div>
          </div>
        </section>

        <About />
        <Change />
      </main>
    </div>
  );
};

export default Home;