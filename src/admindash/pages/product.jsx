import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', category: '', img: '', description: '', ml: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get('http://localhost:3000/products');
    setProducts(res.data);
  };

  const handleToggle = async (prod) => {
    await axios.put(`http://localhost:3000/products/${prod.id}`, { ...prod, isActive: !prod.isActive });
    loadProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, category, img, description, ml } = form;

    if (!title || !price || !category || !img || !description || !ml) {
      alert('Please fill in all fields.');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert('Price must be a valid number.');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/products/${editingId}`, form);
      } else {
        await axios.post('http://localhost:3000/products', { ...form, isActive: true });
      }
      setForm({ title: '', price: '', category: '', img: '', description: '', ml: '' });
      setEditingId(null);
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      alert('Something went wrong while saving the product.');
      console.error(err);
    }
  };

  const startEdit = (prod) => {
    setForm(prod);
    setEditingId(prod.id);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(prod =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Products</h1>

      <input
        type="text"
        placeholder="Search products by title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-6 w-full p-2 border border-slate-400 rounded focus:outline-none focus:border-green-600"
      />
       <div className="mb-4 ">
        <button
          onClick={() => {
            setForm({ title: '', price: '', category: '', img: '', description: '', ml: '' });
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded"
        >
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="bg-white p-4 rounded border border-gray-200 shadow">
            <img src={prod.img} alt={prod.title} className="w-full h-40 object-contain mb-2" />
            <h2 className="font-semibold">{prod.title}</h2>
            <p className="text-gray-600">₹{prod.price}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => startEdit(prod)} className="bg-blue-600 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button
                onClick={() => handleToggle(prod)}
                className={`px-3 py-1 rounded ${prod.isActive ? 'bg-yellow-500' : 'bg-green-600'} text-white`}
              >
                {prod.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

     

     {/* modaaaaallllll*/}


     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex  justify-center backdrop-blur-2xl  ">
          <div className="bg-white p-4 rounded shadow-xl w-100 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {editingId ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} >
              <div className=" gap-6">
               
               <label for="name" class="block text-sm  py-1 font-medium text-gray-700">Item Name</label>
                <input
                id='name'
                  type="text"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="border border-slate-400 rounded p-2 focus:outline-none focus:border-green-600 w-full "
                />
          
               <label for="price" class="block text-sm  py-1 font-medium text-gray-700">Price</label>
                <input
                id='price'
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="border border-slate-400 rounded p-2 focus:outline-none focus:border-green-600 w-full"
                />


                <label for="category" class="block text-sm  py-1 font-medium text-gray-700">Category</label>
                <select
                id='category'
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="border border-slate-400 rounded p-2 focus:outline-none focus:border-green-600 w-full text-gray-700"
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>


                <label for="ml" class="block text-sm  py-1 font-medium text-gray-700">Bottle Volume</label>
                <input
                id='ml'
                  type="text"
                  placeholder="in ml"
                  value={form.ml}
                  onChange={(e) => setForm({ ...form, ml: e.target.value })}
                  className="border border-slate-400 rounded p-2 focus:outline-none focus:border-green-600 w-full"
                />


                <label for="url" class="block text-sm  py-1 font-medium text-gray-700">Product Image</label>
                <input
                id='url'
                  type="text"
                  placeholder="Image URL"
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                  className="border border-slate-400 rounded p-2 focus:outline-none focus:border-green-600 w-full"
                />
              </div>

              <div className="mt-4">
                 <label for="des" class="block text-sm  py-1 font-medium text-gray-700">Product Description</label>
                <textarea
                id='des'
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="border border-slate-400 rounded p-2 focus:outline-none focus:border-green-600 w-full"
                  rows={3}
                />
              </div>
              <button type="submit" className="mt-4 bg-green-800 text-white px-4 py-2 rounded">
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
