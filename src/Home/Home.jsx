import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import backgroundImage from "./images/bging1.jpg";
import bgSmall from "./images/bgsmall.jpg";
import bgmen from "./images/bgmen.jpeg";
import bgwomen from "./images/bgwomen.jpeg";


// Sub-components
import BestSellers from "./BestSellers";
import About from "./About";
import Change from "./Change";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  // Modern Line Separator Accent
  const SectionDivider = () => (
    <div className="flex items-center justify-center gap-4 py-12 bg-white">
      <div className="w-16 h-[1px] bg-emerald-800/10" />
      <div className="w-2 h-2 rounded-full border border-emerald-800/20" />
      <div className="w-16 h-[1px] bg-emerald-800/10" />
    </div>
  );

  return (
    <div className="relative w-full">
      {/* --- SECTION 1: HERO --- */}
      <section className="relative h-screen w-full flex flex-col justify-end overflow-hidden">
        <div className="fixed inset-0 h-screen w-full -z-10">
          <img
            src={backgroundImage}
            alt="Perfaura Hero"
            className="hidden md:block w-full h-full object-cover object-center"
          />
          <img
            src={bgSmall}
            alt="Perfaura Hero Mobile"
            className="block md:hidden w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="w-full h-full flex justify-start items-end md:items-end px-0 md:px-20 pb-0 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-2xl bg-white/10 text-white 
                       pt-6 pb-10 px-6 md:p-12 
                       w-full md:w-auto md:max-w-xl 
                       rounded-t-[2.5rem] rounded-b-none md:rounded-[3rem] 
                       border-t border-x md:border border-white/20 shadow-2xl"
          >
            <h2 className="text-xl md:text-4xl leading-tight font-black mb-2 md:mb-4 uppercase tracking-tighter">
              EVERY FRAGRANCE TELLS A STORY,<br className="hidden md:block" />
              LET YOURS BEGIN WITH PERF
              <span className="text-emerald-400 font-light italic tracking-tight">AURA</span>.
            </h2>

            <p className="text-xs md:text-base mb-6 md:mb-8 opacity-80 font-medium tracking-wide leading-relaxed max-w-sm">
              We want you to express yourself through a deeply sensorial experience.
            </p>

            <Link
              to="/productpage"
              className={`
                group relative inline-flex h-11 md:h-12 items-center justify-center overflow-hidden rounded-full 
                border border-white/30 font-medium text-neutral-200 transition-all duration-1000 ease-out cursor-pointer 
                bg-emerald-950/60 backdrop-blur-md
                ${isScrolled ? 'w-full md:w-64' : 'w-11'} 
                lg:w-12  lg:hover:w-80
              `}
            >
              <div className={`
                inline-flex whitespace-nowrap transition-all duration-1000 text-[10px] tracking-[0.2em] uppercase font-bold
                ${isScrolled ? 'opacity-100 -translate-x-3' : 'opacity-0'}
                lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:-translate-x-3
              `}>
                Explore The Art Of Perfumes
              </div>
              <div className="absolute right-3 md:right-4">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4 md:h-5 md:w-5">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <main className="relative z-10 bg-white">

        {/* --- COMPONENT 1: NEW FRAGRANCE (FEATURE) --- */}
        <section className="py-24 md:py-32 px-6 lg:px-24 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageReveal}
              className="relative h-[350px] md:h-[550px] w-full"
            >
              <div className="w-full h-full overflow-hidden rounded-sm shadow-lg bg-gray-50">
                <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" alt="Model" />
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
              className="space-y-6 lg:pl-12"
            >
              <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-emerald-800">Essence of Luxury</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.85]">
                The New <br />
                <span className="luxury-text text-emerald-700 italic font-light lowercase tracking-normal">Fragrance</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm italic">
                "We want you to express yourself through a deeply sensorial experience. Scents that linger and define your aura."
              </p>
              <Link to="/productpage">
                <button className="bg-black text-white px-10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-emerald-900 transition-all duration-500">
                  Shop Collection
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- STYLED SEPARATION: TONAL SHIFT + GHOST TEXT --- */}
        {/* --- TIGHTER BEST SELLERS SECTION --- */}
        <div className="bg-[#f9f8f6] py-12 md:py-16 relative overflow-hidden border-y border-gray-100">
          {/* Adjusted Ghost Text: Smaller and higher up */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-emerald-800/[0.03] select-none pointer-events-none tracking-tighter">
            AURA
          </div>

          {/* BestSellers Component */}
          <BestSellers />

          {/* Tighter Bottom Link */}
          <div className="flex justify-center mt-8 pb-4 relative z-10">
            <Link to="/productpage" className="group flex flex-col items-center gap-2">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-emerald-800 transition-colors">
                View All Collections
              </span>
              <div className="h-[1px] w-10 bg-gray-300 group-hover:w-20 group-hover:bg-emerald-800 transition-all duration-700" />
            </Link>
          </div>
        </div>

        {/* --- SECTION 3: MEN'S CATEGORY --- */}
        <section className="py-24 md:py-32 px-6 lg:px-24 bg-white relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="h-[400px] md:h-[600px] overflow-hidden rounded-sm shadow-2xl order-1"
            >
              <img
                src={bgmen}
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                alt="Men's Collection"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 space-y-6 lg:pl-8"
            >
              <span className="text-[10px] tracking-[0.4em] font-bold text-emerald-800 uppercase">Grooming signature</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase leading-[0.9] tracking-tighter">
                Men's <br />
                <span className="luxury-text text-emerald-700 italic font-light lowercase tracking-normal">& Strength</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed tracking-[0.1em] max-w-sm font-medium">
                Defined by power and sophistication. Explore a collection that combines classic wood notes with modern aquatic freshness.
              </p>
              <Link to="/men" className="group inline-flex items-center gap-3 border-b border-emerald-800/30 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-emerald-800 transition-all">
                Explore For Him
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </Link>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* --- SECTION 4: ABOUT --- */}
        
          <About />
        

        <SectionDivider />

        {/* --- SECTION 5: WOMEN'S CATEGORY --- */}
        <section className="py-15 md:py-32 px-6 lg:px-24 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1 space-y-6 lg:pr-8"
            >
              <span className="text-[10px] tracking-[0.4em] font-bold text-emerald-800 uppercase">Feminine Elegance</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase leading-[0.9] tracking-tighter">
                Women's <br />
                <span className="luxury-text text-emerald-700 italic font-light lowercase tracking-normal">& Radiance</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed tracking-[0.1em] max-w-sm font-medium">
                Capturing the essence of grace. A gallery of scents ranging from delicate florals to intoxicating oriental ambers.
              </p>
              <Link to="/women" className="group inline-flex items-center gap-3 border-b border-emerald-800/30 pb-2 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-emerald-800 transition-all">
                Explore For Her
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="h-[400px] md:h-[600px] overflow-hidden rounded-sm shadow-2xl order-1 lg:order-2"
            >
              <img
                src={bgwomen}
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                alt="Women's Collection"
              />
            </motion.div>
          </div>
        </section>

        <Change />
      </main>
    </div>
  );
};

export default Home;