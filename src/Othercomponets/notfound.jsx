import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    /* Added relative and overflow-hidden to keep the background 404 contained and centered */
    <div className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      
      {/* Refined Background Decorative Text:
          - Changed text-gray-200 to text-gray-100 for a subtler look
          - Added inset-0 and flex centering to ensure it's mathematically centered 
      */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <h1 className="text-[25rem] md:text-[30rem] font-black text-gray-200 select-none tracking-tighter opacity-50">
          404
        </h1>
      </div>

      {/* Content wrapper to ensure it stays above the background */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-sm font-bold text-emerald-800 tracking-[0.5em] uppercase mb-4">
          Page Not Found
        </h2>
        
        <h3 className="text-4xl md:text-5xl font-bold text-emerald-950 tracking-tighter mb-6 uppercase">
          Lost in the <span className="font-light italic">Essence</span>
        </h3>
        
        <p className="max-w-md text-gray-500 mb-10 leading-relaxed font-medium">
          The page you are looking for may have been moved, deleted, 
          or perhaps it never existed in our collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/")}
            className="px-10 py-3.5 bg-emerald-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-emerald-800 transition-all shadow-lg active:scale-95"
          >
            Return Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-3.5 border border-emerald-900 text-emerald-900 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-emerald-50 transition-all active:scale-95"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Brand Mark */}
        <div className="mt-20 flex items-center justify-center gap-4 opacity-30">
          <div className="h-[1px] w-12 bg-emerald-900"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-950">
            Perfaura
          </span>
          <div className="h-[1px] w-12 bg-emerald-900"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;