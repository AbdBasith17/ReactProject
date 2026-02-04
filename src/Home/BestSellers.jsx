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
    <div className="w-full bg-[#f9f9f7] py-20 border-y border-gray-100">
      <div className="max-w-7xl mx-auto text-center px-4 mb-10">
        <p className="text-[9px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-2">
          Check Out Our
        </p>
        <h3 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
          Best <span className="text-emerald-700 font-light italic tracking-tight">Sellers</span>
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
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
    </div>
  );
}

export default BestSeller;