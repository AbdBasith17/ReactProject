import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../Othercomponets/Itemcard";

import Loader from "../components/loader"; 

function WomenPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true); 
  const pageSize = 12; 
  const categoryId = 2; 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/products/?category=${categoryId}&page=${page}`)
      .then((response) => {
        setProducts(response.data.results);
        setTotalCount(response.data.count);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      
      <div className="w-full bg-gray-100 pt-10 pb-4">
        <div className="text-left mx-10">
          <h2 className="text-3xl font-normal text-gray-900">Women Perfume</h2>
          <p className="mt-4 text-base text-gray-600">
            Browse our collection of women’s perfumes.
          </p>
        </div>
      </div>

    

      
      {loading ? (
        <Loader />
      ) : (
        <>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
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

          
          <div className="flex justify-center items-center gap-2 mb-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  page === index + 1 ? "bg-green-800 text-white" : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default WomenPage;
