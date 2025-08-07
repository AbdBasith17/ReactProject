import React, { useEffect, useState } from "react";
import ItemCard from "./Itemcard";
import axios from "axios";
import Change from "./Change";

function MenPage() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:3000/products`)
      .then((response) => {
        setProducts(response.data.filter(i=>i.category=="men"));
      })
  }, []);




  return (

    <div >
      <div className="w-full  bg-gray-100 pt-10 pb-4 " >
        <div className="text-left  mx-13  ">
          <h2 className="text-3xl font-normal  text-gray-900 sm:text-3xl">
            Men Perfume
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            This is where you can browse men perfume in this store.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
        {products.map(i => (

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


  )
}
export default MenPage