import React,{useState,useEffect} from 'react';
import Quantity from './qtbutton';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductOverview  () {
  const [products, setProducts] = useState([]);
const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts(null)
      });
  }, [id]);

  return (
    <>
    <div className="max-w-5xl mx-auto py-10 px-10 m-10 backdrop-blur-sm  border border-slate-200   shadow-xl rounded-md">
      <div className="grid md:grid-cols-2 gap-6 items-center">
       
        <div className="order-1">
          <img
            src={products.img}
            alt={products.title}
            className="w-full max-w-sm object-contain rounded mx-auto"
          />
        </div>

        <div className="order-2 pr-2 pb-2">
          <h1 className="text-5xl font-normal mb-4">{products.title}</h1>
          
          
          <p className='mb-2'><span className="text-xl text-gray-500   line-through font-semibold mb-5">₹{'oldprice'}</span>{'    '}<span className="text-2xl  text-green-600 font-semibold mb-4">₹{products.price}</span></p>
          <p className="text-gray-700 mb-2">{products.description}</p>
       <p className="text-xl text-green-600 font-semibold mb-2">{'Category:'} <span className="text-xl   text-gray-500 font-semibold mb-4">{products.category}</span></p>
          <p className="text-xl text-green-600 font-semibold mb-2">{'Size:'} <span className="text-xl   text-gray-500 font-semibold mb-4">{products.ml}</span></p>
        
{/* 
<Quantity/> */}
        
        <button
  className="inline-block rounded-sm mr-10   w-110 bg-green-600 backdrop-blur-xl px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
  href="#"
>
  ADD TO CART
</button>


</div>


</div>
</div>

       <div className="max-w-5xl mx-auto py-10  px-10 backdrop-blur-sm rounded-md">
      <div className="">
             <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 border-b border-gray-200 pb-2">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">
            Experience the luxury of Carolina Herrera's Good Girl fragrance. This bold scent captures the essence of duality—
            sophisticated yet playful, elegant yet energetic. Crafted with premium ingredients for lasting freshness and allure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-gray-200 pb-2">Customer Reviews</h2>
          <div className="space-y-4">
            <div className="border border-slate-200  p-4 rounded-md shadow-sm bg-gray-50">
              <p className="text-sm text-gray-800 mb-1">
                <span className="font-semibold">Amit Sharma:</span> ⭐⭐⭐⭐⭐
              </p>
              <p className="text-gray-600">Absolutely love this fragrance. It lasts long and smells premium!</p>
            </div>
            <div className="border border-slate-200  p-4 rounded-md shadow-sm bg-gray-50">
              <p className="text-sm text-gray-800 mb-1">
                <span className="font-semibold">Neha Verma:</span> ⭐⭐⭐⭐☆
              </p>
              <p className="text-gray-600">Very nice scent, not overpowering. Great for daily wear.</p>
            </div>
        
          </div>
          </div>
          </div>
        </div>
        
        
        </>

  );
};

export default ProductOverview;
