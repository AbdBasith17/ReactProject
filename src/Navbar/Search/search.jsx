import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import api from "../../api/axios";

function Searching() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setSearch('');
        setResults([]);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Search Logic
  useEffect(() => {
    if (!open) return;
    const delayDebounceFn = setTimeout(async () => {
      if (search.trim().length > 0) {
        try {
          const response = await api.get(`products/?search=${search}`);
          // Django typically returns the array in response.data or response.data.results
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
  }, [search, open]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      <button 
        onClick={() => { setOpen(!open); if(open) setSearch(''); }} 
        className="text-gray-600 hover:text-emerald-800 transition-colors z-[110]"
      >
        {open ? <RiCloseLine size={24} /> : <RiSearchLine size={24} />}
      </button>

      <div className={`transition-all duration-500 ease-in-out ${open ? 'w-56 md:w-72 opacity-100 ml-3' : 'w-0 opacity-0 overflow-hidden'}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="SEARCH..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-[11px] tracking-[0.2em] font-bold uppercase py-2 border-b border-gray-200 focus:border-emerald-800 outline-none bg-transparent"
        />

        {open && search.trim().length > 0 && (
          <div className="absolute top-full left-0 z-[100] w-72 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {results.length > 0 ? (
              <ul>
                {results.slice(0, 5).map((product) => {
                  // LOGIC TO GET THE FIRST IMAGE FROM YOUR ProductImage MODEL
                  const displayImage = product.images && product.images.length > 0 
                                       ? product.images[0].image 
                                       : null;

                  return (
                    <li 
                      key={product.id} 
                      onClick={() => { navigate(`/productview/${product.id}`); setOpen(false); setSearch(''); }} 
                      className="flex items-center gap-4 px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-50 last:border-0 group"
                    >
                      <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={displayImage || "https://via.placeholder.com/150"} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          alt="" 
                          onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-tight text-gray-800 line-clamp-1 italic">{product.title}</span>
                        <span className="text-[10px] font-bold text-emerald-700">₹{product.price}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="p-4 text-center text-[10px] font-bold text-gray-400 uppercase">No Matches</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searching;