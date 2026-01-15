import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(res.data.images[0].image);
        } else {
          setSelectedImage("/placeholder.png");
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setProduct(null);
      });
  }, [id]);



  if (!product) {
    return <p className="text-center py-20">Loading product...</p>;
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ image: "/placeholder.png" }];

  return (
    <>
     
      <div className="max-w-5xl mx-auto py-10 px-10 m-10 border border-slate-200 shadow-xl rounded-md bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          
          <div className="flex flex-col items-center">
            
            <div className="w-[320px] h-[320px] flex items-center justify-center  mb-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img.image)}
                  className={`w-16 h-16 border  flex items-center justify-center
                    ${
                      selectedImage === img.image
                        ? "border-green-600"
                        : "border-gray-200"
                    }
                  `}
                >
                  <img
                    src={img.image}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          
          <div>
            <h1 className="text-4xl font-normal mb-4">{product.title}</h1>

            <p className="text-2xl text-green-600 font-semibold mb-4">
              ₹{product.price}
            </p>

            
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            <p className="text-lg text-gray-600 mb-2">
              Category: <span className="font-semibold">{product.category}</span>
            </p>

            <p className="text-lg text-gray-600 mb-4">
              Size: <span className="font-semibold">{product.ml}</span>
            </p>

            <button
              onClick
              className="mt-4 bg-green-600 text-white px-8 py-3 text-sm font-medium rounded-sm transition hover:scale-105 hover:shadow-lg"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto px-10 pb-16 space-y-4">

        
        <details className="border border-slate-200 shadow-xl rounded-md p-4">
          <summary className="cursor-pointer font-semibold text-lg">
            Important Notes
          </summary>
          <div className="mt-3 text-gray-700 space-y-2">
            <p>• Every product listed on the website is 100% genuine.</p>
            <p>• Discount coupons available at checkout.</p>
            <p>
              • FREE SHIPPING on orders above ₹1000/- except remote areas.
            </p>
          </div>
        </details>

        {/* POLICY */}
        <details className="border border-slate-200 shadow-xl rounded-md p-4">
          <summary className="cursor-pointer font-semibold text-lg">
            Exchange, Return & Cancellation Policy
          </summary>
          <div className="mt-3 text-gray-700 space-y-3">
            <p className="font-semibold">Exchange & Return Policy</p>
            <p>
              Exchanges or returns are accepted only if the product is sealed
              and unused. Opened items are not eligible. Concerns must be raised
              within 24 hours of delivery.
            </p>

            <p className="font-semibold">Order & Cancellation Policy</p>
            <p>
              Prepaid orders only. Cancellations are not accepted.
              In rare cases, store credits may be issued.
            </p>
            <p>
              If shipped, ₹500 deduction applies for logistics & packaging.
              No refunds to original payment source.
            </p>
          </div>
        </details>

        {/* FRAGRANCE GUIDE */}
        <details className="border border-slate-200 shadow-xl rounded-md p-4">
          <summary className="cursor-pointer font-semibold text-lg">
            How, When & Where to Apply Fragrances
          </summary>

          <div className="mt-4 text-gray-700 space-y-4 leading-relaxed">
            <p>
              A memorable fragrance becomes part of your presence.
              Treat it as a luxury ritual.
            </p>

            <p className="font-semibold">Preparation</p>
            <p>
              Apply on clean, dry skin after a warm shower.
              Hydrated skin holds fragrance longer.
            </p>

            <p className="font-semibold">Application</p>
            <p>
              Spray on pulse points — wrists, neck, behind ears.
              Never rub the fragrance.
            </p>

            <p className="font-semibold">Finishing Touch</p>
            <p>
              Reapply lightly if needed. Let seasons and concentration guide you.
            </p>
          </div>
        </details>

      </div>
    </>
  );
}

export default ProductOverview;
