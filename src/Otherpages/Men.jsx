import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../Othercomponets/Itemcard";
import Loader from "../components/loader";

function MenPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");

  const categoryId = 1; 
  const pageSize = 12;

  useEffect(() => {
    fetchProducts();
  }, [page, sortOrder]);

  const fetchProducts = () => {
    setLoading(true);
    let url = `products/?category=${categoryId}&page=${page}`;
    if (sortOrder) url += `&ordering=${sortOrder}`;
    
    api.get(url).then((res) => {
      setProducts(res.data.results);
      setTotalCount(res.data.count);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }).catch((err) => {
      console.error("Error fetching men's products:", err);
    }).finally(() => setLoading(false));
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section - Responsive Padding */}
      <div className="w-full bg-emerald-50/40 py-12 px-6 lg:px-10 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold text-emerald-800 tracking-[0.5em] uppercase">Masculine Essence</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-emerald-950 mt-2 tracking-tighter uppercase">
            MEN<span className="font-light italic">PERFUMES</span>
          </h2>   
          <p className="mt-4 text-sm text-gray-500 max-w-xl font-medium leading-relaxed">
            Bold notes and sophisticated undertones crafted for the man who leaves a lasting impression.
          </p>
        </div>
      </div>

      {/* Filter/Sort Bar - Responsive Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-100 gap-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{totalCount} Curated Scents</p>
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">Sort By:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => {setSortOrder(e.target.value); setPage(1);}} 
            className="text-xs font-bold border-b-2 border-emerald-800 py-1 focus:outline-none bg-transparent cursor-pointer uppercase"
          >
            <option value="">New Arrivals</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="title">A to Z</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center"><Loader /></div>
      ) : (
        <>
          {/* THE UPDATED GRID: grid-cols-2 for mobile (2 items per row) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 px-4 lg:px-10 py-12 max-w-7xl mx-auto">
            {products.map((p) => (
              <ItemCard key={p.id} {...p} price={`₹${p.price}`} />
            ))}
          </div>

          {/* Pagination Section - Improved for mobile touch */}
          <div className="flex flex-col items-center gap-10 pb-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page-1)} 
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-emerald-900 rounded-full text-emerald-900 disabled:opacity-20 hover:bg-emerald-900 hover:text-white transition-all"
              >←</button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setPage(i+1)} 
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-[10px] sm:text-xs font-bold ${page === i + 1 ? "bg-emerald-900 text-white" : "text-emerald-900 hover:bg-emerald-50"}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                disabled={page === totalPages} 
                onClick={() => setPage(page+1)} 
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-emerald-900 rounded-full text-emerald-900 disabled:opacity-20 hover:bg-emerald-900 hover:text-white transition-all"
              >→</button>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900 hover:text-emerald-600 transition-colors"
            >
              ↑ Back to Top
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MenPage;