import React from 'react';

const Checkout = () => {
  const cartItems = [
    {
      id: 1,
      title: 'Dior Sauvage Eau de Toilette',
      price: 8200,
      quantity: 1,
      ml: '300 ml',
    },
    {
      id: 2,
      title: 'Bleu de Chanel',
      price: 9400,
      quantity: 2,
      ml: '300 ml',
    },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>


        {/* Order Summary */}
        <div className="bg-gray-50 border rounded p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} • {item.ml}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-violet-700">₹{total}</span>
          </div>
              <button
            type="submit"
            className="bg-violet-700 text-white px-6 py-2 rounded hover:bg-violet-800 w-full"
          >
            Place Order
          </button>
        </div>
      </div>

  );
};

export default Checkout;
