"use client";

import { useState } from "react";
import { Plus, Search, Package, X, Save, Trash2 } from "lucide-react";

const inputClass = "w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-600";
const labelClass = "block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2";

// Fake homepage products the admin can delete
const HOMEPAGE_PRODUCTS = [
  { id: "home-1", name: "The Executive Chronograph", badge: "Best Seller", price: "$1,850.00", image: "/images/leather_watch.png", source: "Homepage — Masterpiece Collection" },
  { id: "home-2", name: "Royal Cuban Link Chain", badge: "New Arrival", price: "$940.00", image: "/images/mens_jewelry.png", source: "Homepage — Masterpiece Collection" },
];

export default function AdminProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [homepageProducts, setHomepageProducts] = useState(HOMEPAGE_PRODUCTS);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({ name: "", sku: "", category: "watch", price: "", stock: "", description: "" });

  const handleDelete = (id) => {
    setHomepageProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-white">Inventory</h1>
          <p className="text-gray-400 text-sm">Manage the entire watch and jewelry collection catalog.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-4 py-2 rounded-md text-black font-bold text-sm uppercase transition-colors shadow-[0_0_12px_rgba(212,175,55,0.3)]"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Homepage Featured Products (deletable) */}
      {homepageProducts.length > 0 && (
        <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-serif text-white">Homepage Featured Products</h2>
              <p className="text-xs text-gray-500 mt-0.5">These are the placeholder cards on the public homepage. Delete them when you're ready to add your real products.</p>
            </div>
            <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full">Placeholder</span>
          </div>
          <div className="space-y-3">
            {homepageProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-black border border-[#333] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-70" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{product.source} • <span className="text-[#D4AF37]">{product.badge}</span> • {product.price}</p>
                  </div>
                </div>
                {deleteConfirm === product.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-400">Confirm delete?</span>
                    <button onClick={() => handleDelete(product.id)} className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-500/30 transition-colors font-bold">Yes, Delete</button>
                    <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-500 hover:text-white px-2 py-1.5 transition-colors">Cancel</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(product.id)}
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded transition-colors"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Catalog */}
      <div className="bg-[#121212] border border-[#222] rounded-xl overflow-hidden p-6">
        <div className="relative w-64 mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
          <input type="text" placeholder="Search catalog..." disabled
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-10 py-2 text-gray-700 text-sm cursor-not-allowed placeholder:text-gray-700" />
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 uppercase tracking-wider text-xs border-b border-[#222]">
            <tr>
              <th className="pb-3 font-medium">Item Name</th>
              <th className="pb-3 font-medium">SKU</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Stock</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <Package size={26} className="text-[#333]" />
          </div>
          <h3 className="text-gray-500 font-serif text-xl">No Products Added Yet</h3>
          <p className="text-gray-700 text-sm max-w-sm leading-relaxed">
            Click <span className="text-[#D4AF37]">Add Product</span> above to list your first watch or jewelry item.
          </p>
          <button onClick={() => setShowModal(true)} className="mt-2 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-2.5 rounded text-black font-bold text-sm uppercase tracking-widest transition-colors">
            <Plus size={16} /> Add First Product
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111] border border-[#333] rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#222]">
              <div>
                <h2 className="text-xl font-serif text-white">Add New Product</h2>
                <p className="text-xs text-gray-500 mt-0.5">Fill in the details to publish a product to your store.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#1a1a1a]">
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className={labelClass}>Product Name</label>
                  <input type="text" placeholder="e.g. The Executive Chronograph" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>SKU</label>
                  <input type="text" placeholder="e.g. WX-7832" value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                    <option value="watch">Watch</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Price (₦ or $)</label>
                  <input type="text" placeholder="e.g. 1850000" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Stock Quantity</label>
                  <input type="number" min="0" placeholder="e.g. 10" value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Product Description</label>
                  <textarea rows={4} placeholder="Describe the product..." value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputClass} resize-none`} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Product Image URL</label>
                  <input type="text" placeholder="https://... or /images/product.png" className={inputClass} />
                  <p className="text-xs text-gray-700 mt-1">Paste a public image URL or upload to /public/images/ first.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-[#222]">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-400 hover:text-white border border-[#333] hover:border-[#555] rounded text-sm uppercase tracking-widest transition-colors">
                Cancel
              </button>
              <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-2.5 rounded text-black font-bold text-sm uppercase tracking-widest transition-colors">
                <Save size={16} /> Publish Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
