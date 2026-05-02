import React, { useEffect, useState } from "react";
import ItemCard from "../Othercomponets/Itemcard";
import api from "../api/axios"; 

function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("products/best-sellers/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching best sellers:", error);
      });
  }, []);

  return (
    /* Changed bg-white to transparent to inherit the Bone White from Home.js */
    /* Removed py-24 to let Home.js control the sectional rhythm */
    <section className="w-full relative z-10">
      <div className="max-w-7xl mx-auto text-center px-4 mb-16 md:mb-20">
        <p className="text-[10px] font-bold text-emerald-800 tracking-[0.5em] uppercase mb-4">
          Curated Excellence
        </p>
        <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-tight">
          Best <span className="text-emerald-700 font-light italic tracking-normal lowercase">Sellers</span>
        </h3>
        
        {/* Refined separator to match the Home page aesthetic */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-8 h-[1px] bg-emerald-800/30"></div>
          <div className="w-1 h-1 rounded-full bg-emerald-700"></div>
          <div className="w-8 h-[1px] bg-emerald-800/30"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-10">
          {products.map((product) => (
            <ItemCard
              key={product.id} 
              id={product.id}
              images={product.images}
              title={product.title}
              category_name={product.category_name}
              price={`₹${product.price}`}
              ml={product.ml}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSeller;