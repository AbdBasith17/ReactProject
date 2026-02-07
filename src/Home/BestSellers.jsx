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
    <section className="w-full py-24">
      <div className="max-w-7xl mx-auto text-center px-4 mb-16">
        <p className="text-[10px] font-bold text-emerald-800 tracking-[0.4em] uppercase mb-3">
          Curated Excellence
        </p>
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
          Best <span className="text-emerald-700 font-light italic tracking-tight">Sellers</span>
        </h3>
        <div className="w-12 h-[2px] bg-emerald-800/20 mx-auto mt-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
          {products.map((product) => (
            <ItemCard
              key={product.id} 
              id={product.id}
              images={product.images}
              title={product.title}
              category={product.category}
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