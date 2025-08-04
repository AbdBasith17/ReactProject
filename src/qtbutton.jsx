import React, { useState } from "react";

function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  return (
    <form className="max-w-xs mx-auto">
      <label
        htmlFor="counter-input"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        Choose quantity:
      </label>
      <div className="relative flex items-center">
        {/* Decrease */}
        <button
          type="button"
          onClick={decrement}
          className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-200 text-gray-900 dark:text-white border border-gray-300 rounded-md h-7 w-7 flex items-center justify-center text-sm font-semibold focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none"
        >
          -
        </button>

        {/* Quantity Display */}
        <input
          type="text"
          readOnly
          id="counter-input"
          value={quantity}
          className="shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 w-12 text-center"
        />

        {/* Increase */}
        <button
          type="button"
          onClick={increment}
          className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 text-gray-900 dark:text-white border border-gray-300 rounded-md h-7 w-7 flex items-center justify-center text-sm font-semibold focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 focus:outline-none"
        >
          +
        </button>
      </div>
    </form>
  );
}
export default Quantity
