import React, { useEffect, useState } from "react";
import ItemCard from "./Itemcard";
import axios from "axios";
import Change from "./Change";

function ProductPage() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("fetch err" ,error);
      });
  }, []);


  return (

    <div >
      <div className="w-full  bg-gray-100 pt-10 pb-4 " >
        <div className="text-left  mx-13  ">
          <h2 className="text-2xl font-medium  text-gray-900 sm:text-3xl">
            Shop
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-green-800">
            This is where you can browse products in this store.
          </p>
        </div>
      </div>
      <Change/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
        {products.map(i => (

          <ItemCard
            key={i.id}
            id={i.id}
            image={i.img}
            title={i.title}
            caregory ={i.caregory}
            price={`₹${i.price}`}
            ml={i.ml}

          />
        ))}


      </div>
       <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-300 font-bold">
        
       <a href="/productpage"  className="pt-10">Go to TOP</a>
      </div>

    </div>


  )
}
export default ProductPage