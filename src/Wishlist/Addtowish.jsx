import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddToWishlistButton = ({ product }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`http://localhost:3000/wishlists?userId=${user.id}`);
        const wishlist = res.data[0];

        if (wishlist) {
          setWishlistId(wishlist.id);
          const alreadyAdded = wishlist.items.some((item) => item.id === product.id);
          setIsInWishlist(alreadyAdded);
        }
      } catch (err) {
        console.error("Error checking wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user, product.id]);

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
  
    

    if (!user) {
      toast.error("Please log in to add to wishlist.");
      return;
    }

    try {
      if (isInWishlist) {
        toast.info("Already in your wishlist.");
        navigate('/wishlist')
        return;
      }

      if (wishlistId) {
        const res = await axios.get(`http://localhost:3000/wishlists/${wishlistId}`);
        const updatedItems = [...res.data.items, {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img,
          category: product.category,
        }];

        await axios.put(`http://localhost:3000/wishlists/${wishlistId}`, {
          ...res.data,
          items: updatedItems,
        });

        setIsInWishlist(true);
        toast.success("Added to wishlist!");
      } else {
        const newWishlist = await axios.post(`http://localhost:3000/wishlists`, {
          userId: user.id,
          items: [
            {
              id: product.id,
              title: product.title,
              price: product.price,
              img: product.img,
              category: product.category,
            },
          ],
        });

        setWishlistId(newWishlist.data.id);
        setIsInWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Failed to add to wishlist.");
    }
  };

  return (
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-green-700 cursor-pointer"
      onClick={handleAddToWishlist}
      title={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
    >
      {isInWishlist ? (
        <FaHeart size={28} className="text-green-600" />
      ) : (
        <FaHeartCirclePlus size={30} />
      )}
    </button>
  );
};

export default AddToWishlistButton;
