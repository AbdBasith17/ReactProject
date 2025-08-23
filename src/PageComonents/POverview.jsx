import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductOverview() {
  const [products, setProducts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Err fetching products:", error);
        setProducts(null);
      });
  }, [id]);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      toast.info(
        <div className="flex items-center justify-between gap-4">
          <span>Please log in to continue.</span>
          <button
            className="text-sm text-green-800 border border-green-800 px-4 py-1 rounded hover:bg-green-800 hover:text-white transition"
            onClick={() => {
              toast.dismiss();
              navigate('/signin');
            }}
          >
            Login
          </button>
        </div>,
        { autoClose: false,
          style:{width:"340px"} 
         
        }
      );
      return; 
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === products.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...products, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!products) {
    return <p>Loading product...</p>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 px-10 m-10 backdrop-blur-sm border border-slate-200 shadow-xl rounded-md">
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

            <p className='mb-2'>
              <span className="text-xl text-gray-500 line-through font-semibold mb-5"></span>{' '}
              <span className="text-2xl text-green-600 font-semibold mb-4">₹{products.price}</span>
            </p>
            <p className="text-gray-700 mb-2">{products.description}</p>
            <p className="text-xl text-green-600 font-semibold mb-2">
              {'Category:'} <span className="text-xl text-gray-500 font-semibold mb-4">{products.category}</span>
            </p>
            <p className="text-xl text-green-600 font-semibold mb-2">
              {'Size:'} <span className="text-xl text-gray-500 font-semibold mb-4">{products.ml}</span>
            </p>

            <button
              className="inline-block rounded-sm mr-10 mt-5 w-110 bg-green-600 backdrop-blur-xl px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-10 px-10 backdrop-blur-sm rounded-md">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 border-b border-gray-200 pb-2">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">
             Discover the essence of elegance and individuality with our carefully curated selection of perfumes. Each fragrance is crafted with premium ingredients to deliver a lasting impression — whether you prefer something fresh and floral, warm and woody, or bold and exotic. Perfect for daily wear or special occasions, our collection includes signature scents from the world's most renowned brands. Find your next favorite fragrance and express your unique style through scent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 border-b border-gray-200 pb-2">Customer Reviews</h2>
            <div className="space-y-4">
              <div className="border border-slate-200 p-4 rounded-md shadow-sm bg-gray-50">
                <p className="text-sm text-gray-800 mb-1">
                  <span className="font-semibold">Amit Sharma:</span> ⭐⭐⭐⭐⭐
                </p>
                <p className="text-gray-600">Absolutely love this fragrance. It lasts long and smells premium!</p>
              </div>
              <div className="border border-slate-200 p-4 rounded-md shadow-sm bg-gray-50">
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
}

export default ProductOverview;
