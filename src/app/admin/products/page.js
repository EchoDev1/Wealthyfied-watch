"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Search, Package, X, Save, Trash2, Camera, FileImage, 
  FolderOpen, Link as LinkIcon, RefreshCcw, Pencil, 
  Eye, EyeOff, AlertCircle, CheckCircle2, ChevronRight, Image as ImageIcon
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const inputClass = "w-full bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700 shadow-inner";
const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2 ml-1";

export default function AdminProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [imageSource, setImageSource] = useState("url");
  const [form, setForm] = useState({ 
    name: "", 
    sku: "", 
    category: "watch", 
    price: "", 
    stock: "", 
    description: "", 
    images: [] // Array of images
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch products from Supabase on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formatted = data.map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category,
        price: p.price,
        stock: p.stock,
        description: p.description,
        isActive: p.is_active,
        images: p.metadata?.images || (p.metadata?.image ? [p.metadata.image] : []),
        dateAdded: new Date(p.created_at).toLocaleDateString()
      }));
      
      setCatalogProducts(formatted);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm(prev => ({ ...prev, images: [...prev.images, reader.result] }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const toggleProductStatus = async (product) => {
    try {
      const newStatus = !product.isActive;
      const { error } = await supabase
        .from('products')
        .update({ is_active: newStatus })
        .eq('id', product.id);

      if (error) throw error;
      
      setCatalogProducts(prev => prev.map(p => 
        p.id === product.id ? { ...p, isActive: newStatus } : p
      ));
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Failed to update product status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        if (error.code === '23503') {
          throw new Error("This product cannot be deleted because it is linked to existing orders. Try making it 'Inactive' instead.");
        }
        throw error;
      }
      
      setCatalogProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.message || "Failed to delete product. It might be linked to orders.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      images: product.images || []
    });
    setShowModal(true);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || form.images.length === 0) {
      alert("Please fill in the required fields (Name, Price, and at least one Image)");
      return;
    }

    setIsPublishing(true);
    
    try {
      const numericPrice = parseFloat(form.price.toString().replace(/[^\d.]/g, ''));
      if (isNaN(numericPrice)) throw new Error("Invalid price format.");

      const payload = {
        name: form.name,
        sku: form.sku || `SKU-${Date.now()}`,
        description: form.description,
        category: form.category,
        price: numericPrice,
        stock: parseInt(form.stock) || 0,
        is_active: true,
        metadata: { images: form.images }
      };

      let result;
      if (editingId) {
        result = await supabase.from('products').update(payload).eq('id', editingId).select();
      } else {
        result = await supabase.from('products').insert([payload]).select();
      }

      const { data, error } = result;
      if (error) throw error;

      await fetchProducts(); // Refresh list
      setPublishSuccess(true);
      
      setTimeout(() => {
        setForm({ name: "", sku: "", category: "watch", price: "", stock: "", description: "", images: [] });
        setShowModal(false);
        setPublishSuccess(false);
        setEditingId(null);
      }, 1500);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error: " + (error.message || "Failed to save product"));
    } finally {
      setIsPublishing(false);
    }
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const filteredProducts = catalogProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111] p-8 rounded-2xl border border-[#222]">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">Master Inventory</h1>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Package size={14} className="text-[#D4AF37]" />
            Manage your global collection of luxury timepieces and jewelry.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={fetchProducts}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] px-5 py-3 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <RefreshCcw size={18} className={isLoading ? "animate-spin text-[#D4AF37]" : ""} />
            <span className="text-xs font-bold uppercase tracking-widest">Sync</span>
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", sku: "", category: "watch", price: "", stock: "", description: "", images: [] });
              setShowModal(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-3 rounded-xl text-black font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>
      </div>

      {/* Main Catalog Table */}
      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#222] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, SKU or reference..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222] rounded-full px-12 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700" 
            />
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500 uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>{catalogProducts.filter(p => p.isActive).length} Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span>{catalogProducts.filter(p => !p.isActive).length} Inactive</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
            <thead className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black border-b border-[#222] bg-[#0a0a0a]/50">
              <tr>
                <th className="py-5 px-6">Product Details</th>
                <th className="py-5 px-6">SKU / Ref</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6">Inventory</th>
                <th className="py-5 px-6">Price</th>
                <th className="py-5 px-6 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className={`hover:bg-[#151515] transition-all group ${!product.isActive ? 'opacity-60' : ''}`}>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-xl bg-black border border-[#222] overflow-hidden relative shrink-0">
                        {product.images?.[0] ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <ImageIcon className="absolute inset-0 m-auto text-gray-800" size={24} />
                        )}
                        {product.images?.length > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/80 text-[8px] px-1 rounded border border-white/10 text-white">
                            +{product.images.length - 1}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-white font-serif text-lg block group-hover:text-[#D4AF37] transition-colors">{product.name}</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37]/60 bg-[#D4AF37]/5 px-2 py-0.5 rounded-full border border-[#D4AF37]/10">{product.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 font-mono text-xs text-gray-400">{product.sku}</td>
                  <td className="py-6 px-6">
                    <button 
                      onClick={() => toggleProductStatus(product)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        product.isActive 
                          ? "bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20" 
                          : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                      }`}
                    >
                      {product.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                      {product.isActive ? "Live" : "Hidden"}
                    </button>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm font-bold ${product.stock <= 2 ? 'text-red-400' : 'text-white'}`}>
                        {product.stock} Units
                      </span>
                      {product.stock === 0 && <span className="text-[9px] text-red-500 uppercase font-black tracking-tighter">Out of Stock</span>}
                      {product.stock <= 2 && product.stock > 0 && <span className="text-[9px] text-yellow-500 uppercase font-black tracking-tighter">Low Stock</span>}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-[#D4AF37] font-serif text-lg font-bold">{formatCurrency(product.price)}</td>
                  <td className="py-6 px-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="h-10 w-10 flex items-center justify-center bg-[#1a1a1a] border border-[#222] rounded-xl text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                        title="Edit Details"
                      >
                        <Pencil size={18} />
                      </button>
                      
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-2 animate-slide-left">
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 h-10 rounded-xl text-xs font-bold uppercase transition-all"
                          >
                            Delete
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(null)}
                            className="text-gray-500 hover:text-white px-2 text-xs font-bold uppercase transition-all"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setDeleteConfirm(product.id)}
                          className="h-10 w-10 flex items-center justify-center bg-[#1a1a1a] border border-[#222] rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-[#0a0a0a] border border-[#222] flex items-center justify-center shadow-inner">
              <Package size={40} className="text-gray-800" />
            </div>
            <div>
              <h3 className="text-gray-400 font-serif text-2xl">
                {searchQuery ? "No matching assets found" : "Your Vault is Empty"}
              </h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto mt-2">
                {searchQuery ? `We couldn't find any items matching "${searchQuery}" in your current inventory.` : "Begin by adding your first luxury timepiece or jewelry masterpiece to the catalog."}
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <RefreshCcw className="animate-spin text-[#D4AF37]" size={40} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600">Retrieving Secure Data...</span>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-xl">
          <div className="bg-[#111] border border-[#222] rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b border-[#222] bg-[#0a0a0a]/50">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  {editingId ? <Pencil className="text-[#D4AF37]" size={24} /> : <Plus className="text-[#D4AF37]" size={24} />}
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-white">{editingId ? "Update Masterwork" : "Publish New Asset"}</h2>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Catalog Entry / Secure Update Protocol</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-all p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10">
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Product Name</label>
                    <input type="text" placeholder="e.g. Royal Oak Offshore" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Reference / SKU</label>
                      <input type="text" placeholder="REF-8832" value={form.sku}
                        onChange={(e) => setForm({ ...form, sku: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Collection</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                        <option value="watch">Watch Collection</option>
                        <option value="jewelry">Mens Jewelry</option>
                        <option value="accessory">Luxury Accessories</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Price (₦)</label>
                      <input type="text" placeholder="1850000" value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Initial Stock</label>
                      <input type="number" min="0" placeholder="10" value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Story & Specifications</label>
                    <textarea rows={5} placeholder="Describe the craftsmanship..." value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className={`${inputClass} resize-none`} />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Media Assets ({form.images.length})</label>
                    
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {form.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl bg-black border border-[#333] overflow-hidden group">
                          <Image src={img} alt={`Asset ${idx}`} fill className="object-cover" />
                          <button 
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      {form.images.length < 6 && (
                        <label className="aspect-square rounded-2xl border-2 border-dashed border-[#222] flex flex-col items-center justify-center text-gray-700 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all cursor-pointer bg-[#0a0a0a]">
                          <Plus size={24} />
                          <span className="text-[8px] uppercase font-black mt-2 tracking-widest">Add Image</span>
                          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                        </label>
                      )}
                    </div>

                    <div className="bg-[#0a0a0a] rounded-2xl border border-[#222] p-6">
                       <label className={labelClass}>Add via URL</label>
                       <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="https://..." 
                            className={`${inputClass} h-11`}
                            id="url-input"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = e.target.value;
                                if (val) {
                                  setForm(prev => ({ ...prev, images: [...prev.images, val] }));
                                  e.target.value = '';
                                }
                              }
                            }}
                          />
                          <button 
                            onClick={() => {
                              const input = document.getElementById('url-input');
                              if (input.value) {
                                setForm(prev => ({ ...prev, images: [...prev.images, input.value] }));
                                input.value = '';
                              }
                            }}
                            className="bg-[#D4AF37] text-black px-4 rounded-lg font-bold"
                          >
                            <ChevronRight size={20} />
                          </button>
                       </div>
                       <p className="text-[10px] text-gray-600 mt-3 flex items-center gap-2">
                          <AlertCircle size={10} /> 
                          Recommended size: 1000x1000px (WEBP/PNG)
                       </p>
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="p-6 bg-[#0a0a0a] rounded-2xl border border-[#222] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white">Status Preview</span>
                      <p className="text-[10px] text-gray-500 mt-1">Asset will be live immediately after publishing.</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                       <CheckCircle2 size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-[#222] bg-[#0a0a0a]/50 flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-8 py-3 text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-all">
                Cancel
              </button>
              <button 
                onClick={handlePublish}
                disabled={isPublishing || publishSuccess}
                className={`flex items-center gap-3 px-10 py-3 rounded-2xl text-black font-black text-xs uppercase tracking-widest transition-all ${
                  publishSuccess 
                    ? "bg-green-500" 
                    : "bg-[#D4AF37] hover:bg-[#B5952F] shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                } disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1`}
              >
                {isPublishing ? (
                  <span className="animate-pulse">Processing Asset...</span>
                ) : publishSuccess ? (
                  <><CheckCircle2 size={18} /> Success</>
                ) : (
                  <>
                    <Save size={18} /> {editingId ? "Update Asset" : "Publish Masterwork"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
