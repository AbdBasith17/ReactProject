

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSearchFill } from "react-icons/ri";

function Serching() {
  const [serch, setSerch] = useState('');
  const [res, setRes] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null); 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (serch.trim().length > 0) {
      axios.get(`http://localhost:3000/products`).then((res) => {
        const loweredSerch = serch.toLowerCase();
        const filter = res.data.filter((product) =>
          product.title.toLowerCase().includes(loweredSerch)
        );
        setRes(filter);
      });
    } else {
      setRes([]);
    }
  }, [serch]);

  const handleClicklist = (product) => {
    navigate(`/productview/${product.id}`);
    setSerch('');
    setRes([]);
    setOpen(false);
  };

  return (
    <div className="relative flex items-center">
     
      <button
        onClick={() => setOpen(!open)}
        className="text-black hover:text-green-700 transition-all"
      >
        <RiSearchFill size={27} />
      </button>

      <div
        className={`ml-2 transition-all duration-300 ease-in-out ${
          open ? 'w-60 opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        <input
          ref={inputRef} 
          type="text"
          placeholder="Search Perfumes Here..."
          value={serch}
          onChange={(e) => setSerch(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />

    
        {res.length > 0 && (
          <ul className="absolute z-50 w-60 mt-1 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200">
            {res.map((product) => (
         <li
              key={product.id}
              onClick={() => handleClicklist(product)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-green-100 cursor-pointer text-sm text-gray-800"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-12 h-12 object-cover rounded"
              />
              <span className="text-sm">{product.title}</span>
            </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Serching;
