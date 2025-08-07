import React, { useEffect, useState } from "react";
import ItemCard from "./Itemcard";
import axios from "axios";


function BestSeller() {
  const [products, setProducts] = useState([]);

const idfetch=["6","11","16","22"]
  useEffect(() => {

    axios.get(`http://localhost:3000/products`)
      .then((response) => {
       setProducts(response.data.filter((i)=> idfetch.includes(i.id)));
      })
  }, []);




  return (

    <div >
      <div className="w-full  bg-gray-100 pt-10 pb-10 " >
        <div className="text-center  mx-13 text-xl text-gray-900 leading-relaxed ">
          <p className="text-xl font-normal  text-gray-900 sm:text-xl">
            BEST SELLERS
          </p>
          <p className="mt-4 text-5xl font-normal leading-7 text-gray-900">
            LOVED BY <span className='text-green-800'>EVERYONE</span>
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
export default BestSeller