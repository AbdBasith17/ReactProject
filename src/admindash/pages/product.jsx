import React, { useEffect, useState } from 'react';
import { Search, Edit3, Trash2, Plus, X, Upload, Loader2, Box } from 'lucide-react';
import api from "../../api/axios";
import { toast } from 'react-toastify';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isServerUp, setIsServerUp] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [stockProduct, setStockProduct] = useState(null);

  const [form, setForm] = useState({ title: '', description: '', category: '', price: '', stock: '', ml: '', is_active: true });
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [stockAdjustment, setStockAdjustment] = useState({ type: 'current', value: 0 });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);


  const loadProducts = async () => {
    try {
      const res = await api.get('admin/products/list/');
      setProducts(res.data);
    } catch (err) { setIsServerUp(false); }
  };

  const loadCategories = async () => {
    try {
      const res = await api.get('categories/');
      setCategories(res.data);
    } catch (err) { console.error("Category Load Error:", err); }
  };

  const toggleProductActive = async (product) => {
    setUpdatingId(product.id);
    const newStatus = !product.is_active;
    try {
      await api.patch(`admin/products/${product.id}/update/`, { is_active: newStatus });
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, is_active: newStatus } : p));
      toast.success(`${product.title} ${newStatus ? 'Activated' : 'Hidden'}`);
    } catch { toast.error("Toggle failed"); } finally { setUpdatingId(null); }
  };

  const handleStockUpdate = async () => {
    if (!stockProduct) return;
    let newStock = parseInt(stockProduct.stock);
    const adjustVal = parseInt(stockAdjustment.value) || 0;
    if (stockAdjustment.type === 'add') newStock += adjustVal;
    else if (stockAdjustment.type === 'remove') newStock = Math.max(0, newStock - adjustVal);
    else newStock = adjustVal;

    try {
      await api.patch(`admin/products/${stockProduct.id}/update/`, { stock: newStock });
      toast.success("Stock Adjusted");
      setIsStockModalOpen(false);
      loadProducts();
      if (isModalOpen && editingId === stockProduct.id) setForm(prev => ({ ...prev, stock: newStock }));
    } catch { toast.error("Update failed"); }
  };

  const handleDeleteProduct = (id, title) => {
    if (window.confirm(`Delete ${title}?`)) {
      api.delete(`admin/products/${id}/delete/`).then(() => {
        toast.success("Removed");
        loadProducts();
      }).catch(() => toast.error("Delete failed"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    imageFiles.forEach(file => data.append('uploaded_images', file));
    try {
      if (editingId) await api.patch(`admin/products/${editingId}/update/`, data);
      else await api.post('admin/products/create/', data);
      setIsModalOpen(false);
      loadProducts();
      toast.success("Vault Updated");
    } catch { toast.error("Submission failed"); }
  };

  const processedProducts = products
    .filter(p => {

      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && p.is_active) ||
        (filterStatus === 'inactive' && !p.is_active);


      const matchesCat = filterCat === 'all' || p.category_name === filterCat;


      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
      if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === 'a-z') return a.title.localeCompare(b.title);
      return b.id - a.id;
    });
  return (
    <div className="space-y-6 pb-10">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">Inventory</h1>
          {/* <span className={`text-[10px] font-black uppercase tracking-widest ${isServerUp ? 'text-emerald-800' : 'text-red-600'}`}>
            System {isServerUp ? 'Live' : 'Offline'}
          </span> */}
        </div>
        <button onClick={() => {
          setEditingId(null);
          setForm({ title: '', description: '', category: '', price: '', stock: '', ml: '', is_active: true });
          setExistingImages([]); setImageFiles([]); setIsModalOpen(true);
        }} className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Plus size={14} className="inline mr-2" /> New Product
        </button>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">

        {/* 1. SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
          <input type="text" placeholder="SEARCH..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-[10px] font-bold outline-none" onChange={e => setSearchTerm(e.target.value)} />
        </div>

        {/* 2. CATEGORY FILTER */}
        <select className="bg-gray-50 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase outline-none" onChange={e => setFilterCat(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>

        {/* 3. STATUS FILTER (NEW) */}
        <select className="bg-gray-50 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase outline-none border-2 border-emerald-50" onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Show Active</option>
          <option value="inactive">Show Inactive</option>
        </select>

        {/* 4. SORTING */}
        <select className="bg-gray-50 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase outline-none" onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
          <option value="a-z">A-Z</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] border overflow-hidden border-gray-100 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 font-black text-[9px] text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Product Detail</th>
              <th className="px-8 py-5 text-center">Stock Status</th>
              <th className="px-8 py-5 text-center">Unit Sold</th>
              <th className="px-8 py-5 text-center">Volume</th>
              <th className="px-8 py-5 text-center">Price</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {processedProducts.map(prod => (
              <tr key={prod.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5 flex items-center gap-4">
                  <img src={prod.images?.[0]?.image} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                  <div>
                    <p className="text-[12px] font-black uppercase">{prod.title}</p>
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{prod.category_name || 'No Category'}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-center text-[11px] font-black text-emerald-700 italic">{prod.stock} PCs</td>
                <td className="px-8 py-5 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-[12px] font-black text-gray-900">
                      {prod.sold || 0}
                    </span>
                    {prod.sold > 50 && (
                      <span className="text-[7px] font-black uppercase text-orange-500 tracking-tighter">
                        Hot Seller
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5 text-center text-[11px] font-bold text-gray-400 italic">{prod.ml}</td>
                <td className="px-8 py-5 text-center font-black text-[12px]">₹{prod.price}</td>

                <td className="px-8 py-5">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => toggleProductActive(prod)} disabled={updatingId === prod.id}
                      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${prod.is_active ? 'bg-green-600' : 'bg-gray-300'}`}>
                      {updatingId === prod.id ? <Loader2 className="animate-spin text-white mx-auto" size={8} /> :
                        <span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${prod.is_active ? 'translate-x-4' : 'translate-x-1'}`} />}
                    </button>
                    <span className={`text-[8px] font-black uppercase ${prod.is_active ? 'text-emerald-700' : 'text-gray-400'}`}>
                      {prod.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button disabled={prod.is_active} title={prod.is_active ? "Inactive product for editing" : "Edit Product"}
                      onClick={() => {
                        setEditingId(prod.id);
                        setForm({ ...prod, category: prod.category });
                        setExistingImages(prod.images || []);
                        setImageFiles([]);
                        setIsModalOpen(true);
                      }}
                      className={`p-2 transition-all rounded-lg ${prod.is_active ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDeleteProduct(prod.id, prod.title)} className="p-2 text-gray-400 hover:text-red-600 transition-all hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STOCK MODAL */}
      {isStockModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 text-center">Manage Stock: {stockProduct?.title}</h3>
            <div className="flex justify-between gap-2 mb-6">
              {['current', 'add', 'remove'].map(type => (
                <button key={type} onClick={() => setStockAdjustment({ ...stockAdjustment, type })}
                  className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${stockAdjustment.type === type ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}>
                  {type}
                </button>
              ))}
            </div>
            <input type="number" className="w-full p-4 bg-gray-50 rounded-2xl text-center text-xl font-black mb-6 outline-none" value={stockAdjustment.value} onChange={e => setStockAdjustment({ ...stockAdjustment, value: e.target.value })} />
            <button onClick={handleStockUpdate} className="w-full py-4 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Confirm Update</button>
            <button onClick={() => setIsStockModalOpen(false)} className="w-full mt-2 text-[9px] font-bold text-gray-400 uppercase">Cancel</button>
          </div>
        </div>
      )}

      {/* MAIN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl my-auto shadow-2xl overflow-hidden">
            <div className="px-10 py-6 border-b flex justify-between items-center bg-gray-50/50">
              <h2 className="text-[12px] font-black uppercase tracking-[0.3em]">{editingId ? 'Refine Collection' : 'Create Entry'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 block tracking-widest">Title *</label>
                <input required className="w-full p-3.5 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none focus:ring-1 focus:ring-black" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className="col-span-2">
                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 block tracking-widest">Description *</label>
                <textarea required rows="3" className="w-full p-3.5 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none focus:ring-1 focus:ring-black" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 block tracking-widest">Category *</label>
                <select required className="w-full p-3.5 bg-gray-50 rounded-xl text-sm font-bold outline-none border-none focus:ring-1 focus:ring-black" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 block tracking-widest">Stock *</label>
                {editingId ? (
                  <button type="button" onClick={() => { setStockProduct(products.find(p => p.id === editingId)); setStockAdjustment({ type: 'current', value: form.stock }); setIsStockModalOpen(true); }}
                    className="w-full p-3.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center justify-center gap-2">
                    <Box size={14} /> Update Stock ({form.stock})
                  </button>
                ) : (
                  <input required type="number" className="w-full p-3.5 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none focus:ring-1 focus:ring-black" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                )}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 block tracking-widest">Price *</label>
                <input required type="number" className="w-full p-3.5 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none focus:ring-1 focus:ring-black" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-gray-400 mb-1 block tracking-widest">Volume (ml) *</label>
                <input required className="w-full p-3.5 bg-gray-50 rounded-xl text-sm font-bold border-none outline-none focus:ring-1 focus:ring-black" value={form.ml} onChange={e => setForm({ ...form, ml: e.target.value })} />
              </div>

              <div className="col-span-2 border-t pt-4">
                <label className="text-[9px] font-black uppercase text-gray-400 mb-4 block tracking-widest">Gallery</label>
                <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                  {existingImages.map(img => (
                    <div key={img.id} className="relative group flex-shrink-0">
                      <img src={img.image} className="w-20 h-20 object-cover rounded-xl border" />
                      <button type="button" onClick={() => {
                        if ((existingImages.length + imageFiles.length) <= 1) return toast.warning("Min 1 image required");
                        api.delete(`admin/products/image/${img.id}/delete/`).then(() => {
                          setExistingImages(prev => prev.filter(i => i.id !== img.id));
                          loadProducts();
                        });
                      }} className="absolute -top-1 -right-1 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all shadow-xl"><X size={10} /></button>
                    </div>
                  ))}
                </div>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-100 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-all">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{imageFiles.length > 0 ? `${imageFiles.length} New Assets Ready` : 'Upload New Assets'}</span>
                  <input type="file" multiple className="hidden" onChange={e => setImageFiles(Array.from(e.target.files))} />
                </label>
              </div>
              <button type="submit" className="col-span-2 py-4 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-emerald-950 italic">Sync Master Collection</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;