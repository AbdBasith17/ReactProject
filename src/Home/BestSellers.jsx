import React, { useEffect, useState } from "react";
import ItemCard from "../Othercomponets/Itemcard";
import axios from "axios";

function BestSeller() {
  const [products, setProducts] = useState([]);
  const idfetch = ["6", "11", "16", "22"];

  useEffect(() => {
    axios.get(`http://localhost:3000/products`)
      .then((response) => {
        setProducts(response.data.filter((i) => idfetch.includes(i.id)));
      });
  }, []);

  return (
    <div className="w-full bg-gray-100 py-10">
      
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-lg sm:text-xl font-medium text-gray-900">
          BEST SELLERS
        </p>
        <p className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug text-gray-900">
          LOVED BY <span className="text-green-800">EVERYONE</span>
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((i) => (
            <ItemCard
              key={i.id}
              id={i.id}
              image={i.img}
              category={i.category}
              title={i.title}
              price={`₹${i.price}`}
              ml={i.ml}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
