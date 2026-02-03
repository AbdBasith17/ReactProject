import React from 'react';
import backgroundImage from './images/bgimg1.png';
import About from './About';
import Change from './Change';
import BestSeller from './BestSellers';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
     
      <div
        className="relative w-full h-[calc(100vh-4rem)] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
       
        <div className="ml-4 md:ml-20 backdrop-blur-xl text-white p-4 md:p-7 rounded-3xl max-w-xs md:max-w-2xl border border-white/20">
          <h2 className="text-2xl md:text-5xl leading-snug md:leading-[3.2rem] font-bold mb-4">
            EVERY FRAGRANCE TELLS A STORY,<br />
            LET YOURS BEGIN WITH PERF
            <span className="text-emerald-700 font-light tracking-[0.1em]">AURA</span>.
          </h2>
          <p className="text-base md:text-xl mb-6">
            We want you to express yourself through a deeply sensorial experience.
          </p>
          <div>
            
            <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border- font-medium text-neutral-200 transition-all duration-300 hover:w-100 cursor-pointer bg-emerald-950/20">
              <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100 text-sm md:text-base  tracking-widest uppercase">
                <Link to="/productpage">Explore The Art Of Perfumes</Link>
              </div>
              <div className="absolute right-3.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <BestSeller />
      
      {/* Restored View All styling */}
      <div className="text-center text-sm text-gray-500 pt-10 pb-10 border-t border-gray-300 font-bold tracking-[0.2em]">
        <Link to="/productpage" className="hover:text-emerald-800 transition-colors">
          VIEW ALL
        </Link>
      </div>

      <About />
      <Change />
    </>
  );
}
export default Home;