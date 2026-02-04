import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import api from "../../api/axios";

// Added customColor prop to handle the White-to-Black transition
function Searching({ mobileMode = false, customColor = "black" }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  
  // On mobile, it's always "open" inside the dropdown. 
  // On desktop, the Navbar controls the width via Framer Motion.
  const open = true; 
  
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when search is triggered
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Search Logic with Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.trim().length > 0) {
        try {
          const response = await api.get(`products/?search=${search}`);
          const data = response.data.results ? response.data.results : response.data;
          setResults(data);
        } catch (error) {
          setResults([]);
        }
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Handle Dynamic Colors
  const isWhite = customColor === "white";
  const borderClass = isWhite ? "border-white/30 focus:border-white" : "border-gray-200 focus:border-emerald-800";
  const inputTextColor = isWhite ? "text-white placeholder:text-white/60" : "text-gray-800 placeholder:text-gray-400";

  return (
    <div className={`relative flex items-center w-full ${mobileMode ? 'px-2' : ''}`}>
      <div className="flex items-center gap-2 w-full">
        {/* Only show internal search icon if in mobile mode */}
        {mobileMode && <RiSearchLine size={18} className="text-gray-400" />}
        
        <input
          ref={inputRef}
          type="text"
          placeholder="SEARCH PRODUCTS..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full text-[11px] tracking-[0.2em] font-bold uppercase py-2 border-b outline-none bg-transparent transition-colors duration-300 ${borderClass} ${inputTextColor}`}
        />
      </div>

      {/* SEARCH RESULTS DROPDOWN */}
      {search.trim().length > 0 && (
        <div className={`absolute top-full left-0 z-[100] mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden ${mobileMode ? 'w-full' : 'w-80'}`}>
          {results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto">
              {results.slice(0, 5).map((product) => {
                const displayImage = product.images && product.images.length > 0 
                                     ? product.images[0].image 
                                     : null;
                return (
                  <li 
                    key={product.id} 
                    onClick={() => { 
                      navigate(`/productview/${product.id}`); 
                      setSearch(''); 
                      setResults([]);
                    }} 
                    className="flex items-center gap-4 px-4 py-4 hover:bg-emerald-50 cursor-pointer border-b border-gray-50 last:border-0 group transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img 
                        src={displayImage || "https://via.placeholder.com/150"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt="" 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-black uppercase tracking-tight text-gray-800 line-clamp-1 group-hover:text-emerald-900 transition-colors">
                        {product.title}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">₹{product.price}</span>
                    </div>
                  </li>
                );
              })}
              <li 
                onClick={() => navigate(`/productpage?search=${search}`)}
                className="p-3 text-center bg-gray-50 text-[10px] font-black uppercase tracking-widest text-emerald-800 hover:bg-emerald-100 cursor-pointer transition-colors"
              >
                View All Results
              </li>
            </ul>
          ) : (
            <div className="p-6 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">No matches found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Searching;