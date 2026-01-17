import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AddToWishlistButton from "../Wishlist/Addtowish";
import { FaBagShopping, FaChevronDown, FaPlus, FaMinus } from "react-icons/fa6";

function ProductOverview() {
  const { id } = useParams();
  const { addToCart } = useAuth(); // Destructure the function from context
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    api.get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]?.image || "/placeholder.png");
      })
      .catch(() => setProduct(null));
  }, [id]);

  const handleQty = (type) => {
    if (type === "plus") setQuantity((prev) => prev + 1);
    if (type === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product.id, quantity);
    setIsAdding(false);
  };

  if (!product) return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-400 animate-pulse tracking-widest uppercase text-xs">Loading Product...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-14 items-start">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="w-full md:w-[45%] md:sticky md:top-24">
            <div className="relative aspect-square w-full max-w-[440px] mx-auto rounded-[2rem] bg-[#F9F9F9] border border-gray-50 flex items-center justify-center p-10 overflow-hidden">
              <div className="absolute top-4 right-4 z-20 scale-90">
                <AddToWishlistButton product={product} />
              </div>
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex gap-3 mt-5 justify-center">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img.image)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all p-1 bg-[#F9F9F9]
                    ${selectedImage === img.image ? "border-slate-400" : "border-transparent opacity-60"}
                  `}
                >
                  <img src={img.image} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="w-full md:w-[55%] flex flex-col pt-2">
            <div className="border-b border-gray-100 pb-6 mb-6">
              <span className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.25em]">
                {product.category} {product.ml && `• ${product.ml}`}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-1 mb-1 tracking-tight">
                {product.title}
              </h1>
              <span className="text-emerald-600 text-[12px] font-black uppercase tracking-[0.3em]">
                {product.brand || "Premium Selection"}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-black text-gray-900">₹{product.price}</span>
              <span className="text-base md:text-lg text-gray-300 line-through font-bold">
                ₹{Math.floor(product.price * 1.3)}
              </span>
            </div>

            <div className="mb-8">
              <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-md">
                {product.description}
              </p>
            </div>

            {/* QTY & CART BUTTON */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center border border-gray-200 rounded-full px-3 py-2 bg-gray-50/50">
                <button onClick={() => handleQty("minus")} className="p-1 hover:text-emerald-600 transition-colors">
                  <FaMinus size={10}/>
                </button>
                <span className="px-4 font-bold text-sm min-w-[35px] text-center">{quantity}</span>
                <button onClick={() => handleQty("plus")} className="p-1 hover:text-emerald-600 transition-colors">
                  <FaPlus size={10}/>
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex items-center justify-center gap-3 bg-black text-white px-10 py-4 text-[11px] font-black rounded-full transition-all hover:bg-emerald-800 tracking-[0.15em] uppercase w-max disabled:bg-gray-400"
              >
                <FaBagShopping size={14} />
                {isAdding ? "Adding..." : "ADD TO CART"}
              </button>
            </div>

            {/* DROPDOWNS */}
            <div className="border-t border-gray-100">
              <ProductDropdown title="Important Notes">
                <div className="text-[13px] text-gray-500 space-y-2 py-3">
                  <p>• Every product listed on the website is 100% genuine.</p>
                  <p>• Discount coupons available at checkout.</p>
                  <p>• FREE SHIPPING on orders above ₹1000/- except remote areas.</p>
                </div>
              </ProductDropdown>

              <ProductDropdown title="Exchange & Return Policy">
                <div className="text-[13px] text-gray-500 space-y-3 py-3">
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Return Policy</p>
                    <p>Exchanges or returns are accepted only if the product is sealed and unused. Opened items are not eligible. Concerns must be raised within 24 hours of delivery.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Order & Cancellation</p>
                    <p>Prepaid orders only. Cancellations are not accepted. In rare cases, store credits may be issued.</p>
                    <p className="mt-2 text-[12px] italic">If shipped, ₹500 deduction applies for logistics & packaging. No refunds to original payment source.</p>
                  </div>
                </div>
              </ProductDropdown>

              <ProductDropdown title="Fragrance Application Guide">
                <div className="text-[13px] text-gray-500 space-y-3 py-3">
                  <p>A memorable fragrance becomes part of your presence. Treat it as a luxury ritual.</p>
                  <div>
                    <p className="font-bold text-gray-800 uppercase text-[10px] tracking-widest">Preparation</p>
                    <p>Apply on clean, dry skin after a warm shower. Hydrated skin holds fragrance longer.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 uppercase text-[10px] tracking-widest">Application</p>
                    <p>Spray on pulse points — wrists, neck, behind ears. Never rub the fragrance.</p>
                  </div>
                  <p className="italic">Reapply lightly if needed. Let seasons and concentration guide you.</p>
                </div>
              </ProductDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductDropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[11px] md:text-[12px] font-black uppercase tracking-widest text-gray-900 group-hover:text-emerald-600 transition-colors">
          {title}
        </span>
        <FaChevronDown size={12} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default ProductOverview;