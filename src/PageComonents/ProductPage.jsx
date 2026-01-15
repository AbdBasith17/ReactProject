import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../Othercomponets/Itemcard";
import Change from "../Home/Change";
import { Link } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 12; // MUST match backend

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/?page=${page}`)
      .then((response) => {
        setProducts(response.data.results); // IMPORTANT
        setTotalCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [page]);

  useEffect(() => {
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  }, [page]);


  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      {/* Header */}
      <div className="w-full bg-gray-100 pt-10 pb-4">
        <div className="text-left mx-10">
          <h2 className="text-2xl font-medium text-gray-900 sm:text-3xl">
            Shop
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-green-800">
            This is where you can browse products in this store.
          </p>
        </div>
      </div>

      <Change />

      
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

      {/* Pagination */}
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
            className={`px-3 py-1 border rounded ${page === index + 1
              ? "bg-green-800 text-white"
              : "bg-white"
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

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-300 font-bold">
        <button
          onClick={() =>
            window.scrollTo({
              top: 150,
              behavior: "smooth",
            })
          }
          className="hover:text-green-800"
        >
          Go to TOP
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
