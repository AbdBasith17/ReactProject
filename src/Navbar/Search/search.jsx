import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";

function Serching() {
  const [serch, setSerch] = useState('');
  const [res, setRes] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (serch.trim().length > 0) {
      axios.get(`http://localhost:3000/products`).then((response) => {
        const filter = response.data.filter((p) => p.title.toLowerCase().includes(serch.toLowerCase()));
        setRes(filter);
      });
    } else setRes([]);
  }, [serch]);

  return (
    <div className="relative flex items-center">
      <button onClick={() => setOpen(!open)} className="text-gray-600 hover:text-emerald-800 transition-colors">
        <RiSearchLine size={24} />
      </button>

      <div className={`transition-all duration-500 ease-in-out ${open ? 'w-56 md:w-72 opacity-100 ml-3' : 'w-0 opacity-0 overflow-hidden'}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="SEARCH..."
          value={serch}
          onChange={(e) => setSerch(e.target.value)}
          className="w-full text-[11px] tracking-[0.2em] font-bold uppercase py-1 border-b border-gray-200 focus:border-emerald-800 outline-none bg-transparent"
        />

        {res.length > 0 && (
          <ul className="absolute z-[100] w-72 mt-4 bg-white shadow-2xl border border-gray-50 right-0">
            {res.map((product) => (
              <li key={product.id} onClick={() => {navigate(`/productview/${product.id}`); setOpen(false); setSerch('');}} className="flex items-center gap-4 px-4 py-3 hover:bg-emerald-50 cursor-pointer group">
                <img src={product.img} className="w-12 h-12 object-cover" alt="" />
                <span className="text-[12px] font-bold uppercase tracking-tight text-gray-800">{product.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default Serching;