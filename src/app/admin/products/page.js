"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Package, X, Save, Trash2, Camera, FileImage, FolderOpen, Link as LinkIcon, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

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
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [imageSource, setImageSource] = useState("url");
  const [form, setForm] = useState({ name: "", sku: "", category: "watch", price: "", stock: "", description: "", image: "" });

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
      
      // Map database fields to UI format
      const formatted = data.map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category,
        price: p.price.toString(),
        stock: p.stock,
        description: p.description,
        image: p.metadata?.image || "/images/leather_watch.png",
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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFolderChange = (e) => {
    const files = Array.from(e.target.files);
    const firstImage = files.find(f => f.type.startsWith('image/'));
    if (firstImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(firstImage);
    }
  };

  const handleDelete = async (id, isHomepage = false) => {
    if (isHomepage) {
      setHomepageProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCatalogProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Check console for details.");
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("Please fill in the required fields (Name, Price, and Image)");
      return;
    }

    setIsPublishing(true);
    
    try {
      // Clean price (remove symbols)
      const numericPrice = parseFloat(form.price.replace(/[^\d.]/g, ''));
      
      if (isNaN(numericPrice)) {
        throw new Error("Invalid price format");
      }

      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: form.name,
          sku: form.sku || `SKU-${Date.now()}`,
          description: form.description,
          category: form.category,
          price: numericPrice,
          stock: parseInt(form.stock) || 0,
          metadata: { image: form.image }
        }])
        .select();

      if (error) throw error;

      const newProduct = {
        ...form,
        id: data[0].id,
        dateAdded: new Date().toLocaleDateString()
      };
      
      setCatalogProducts([newProduct, ...catalogProducts]);
      setPublishSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setForm({ name: "", sku: "", category: "watch", price: "", stock: "", description: "", image: "" });
        setShowModal(false);
        setPublishSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error publishing product:", error);
      alert("Error: " + (error.message || "Failed to save to database"));
    } finally {
      setIsPublishing(false);
    }
  };

  const filteredProducts = catalogProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-white">Inventory</h1>
          <p className="text-gray-400 text-sm">Manage the entire watch and jewelry collection catalog.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] px-4 py-2 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-4 py-2 rounded-md text-black font-bold text-sm uppercase transition-colors shadow-[0_0_12px_rgba(212,175,55,0.3)]"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Homepage Featured Products (deletable) */}
      {homepageProducts.length > 0 && (
        <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-serif text-white">Homepage Featured Products</h2>
              <p className="text-xs text-gray-500 mt-0.5">These are the placeholder cards on the public homepage. Delete them when you&apos;re ready to add your real products.</p>
            </div>
            <span className="text-xs bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full">Placeholder</span>
          </div>
          <div className="space-y-3">
            {homepageProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-black border border-[#333] overflow-hidden relative">
                    <Image src={product.image} alt={product.name} width={48} height={48} className="w-full h-full object-cover opacity-70" />
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
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-10 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-700" 
          />
        </div>
        <table className="w-full text-left text-sm border-collapse">
          <thead className="text-gray-600 uppercase tracking-wider text-xs border-b border-[#222]">
            <tr>
              <th className="pb-3 font-medium px-2">Item Name</th>
              <th className="pb-3 font-medium px-2">SKU</th>
              <th className="pb-3 font-medium px-2">Category</th>
              <th className="pb-3 font-medium px-2">Stock</th>
              <th className="pb-3 font-medium px-2">Price</th>
              <th className="pb-3 font-medium text-right px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-[#1a1a1a] hover:bg-[#151515] transition-colors group">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-black border border-[#222] overflow-hidden">
                      <Image src={product.image} alt={product.name} width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-gray-400">{product.sku}</td>
                <td className="py-4 px-2 capitalize"><span className="px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#D4AF37] text-[10px] font-bold border border-[#D4AF37]/20">{product.category}</span></td>
                <td className="py-4 px-2 text-white">{product.stock}</td>
                <td className="py-4 px-2 text-[#D4AF37] font-semibold">{product.price.startsWith('$') || product.price.startsWith('₦') ? product.price : `$${product.price}`}</td>
                <td className="py-4 px-2 text-right">
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-gray-600 hover:text-red-400 p-1.5 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
              <Package size={26} className="text-[#333]" />
            </div>
            <h3 className="text-gray-500 font-serif text-xl">
              {searchQuery ? "No matching products found" : "No Products Added Yet"}
            </h3>
            <p className="text-gray-700 text-sm max-w-sm leading-relaxed">
              {searchQuery ? `We couldn't find anything matching "${searchQuery}"` : "Click Add Product above to list your first watch or jewelry item."}
            </p>
            {!searchQuery && (
              <button onClick={() => setShowModal(true)} className="mt-2 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-2.5 rounded text-black font-bold text-sm uppercase tracking-widest transition-colors">
                <Plus size={16} /> Add First Product
              </button>
            )}
          </div>
        )}
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
                
                {/* Image Preview Area */}
                {form.image && (
                  <div className="md:col-span-2 animate-fade-in">
                    <label className={labelClass}>Image Preview</label>
                    <div className="relative h-48 w-full bg-black rounded-xl border border-[#333] overflow-hidden group">
                      <Image src={form.image} alt="Preview" fill className="w-full h-full object-contain" />
                      <button 
                        onClick={() => setForm({ ...form, image: "" })}
                        className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className={labelClass}>Select Image</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[
                      { id: 'photos', label: 'Photos', icon: <Camera size={16} /> },
                      { id: 'file', label: 'File', icon: <FileImage size={16} /> },
                      { id: 'folder', label: 'Folder', icon: <FolderOpen size={16} /> },
                      { id: 'url', label: 'URL', icon: <LinkIcon size={16} /> },
                    ].map((src) => (
                      <button
                        key={src.id}
                        type="button"
                        onClick={() => setImageSource(src.id)}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-md border text-xs font-bold uppercase tracking-wider transition-all ${
                          imageSource === src.id
                            ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                            : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-[#555] hover:text-white"
                        }`}
                      >
                        {src.icon} {src.label}
                      </button>
                    ))}
                  </div>

                  {imageSource === 'url' && (
                    <div className="animate-fade-in">
                      <input 
                        type="text" 
                        placeholder="https://... or /images/product.png" 
                        className={inputClass} 
                        value={form.image.startsWith('data:') ? "" : form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                      />
                      <p className="text-xs text-gray-700 mt-2">Paste a public image URL or a local path.</p>
                    </div>
                  )}

                  {imageSource === 'file' && (
                    <div className="animate-fade-in">
                      <div className="border-2 border-dashed border-[#333] rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-colors group cursor-pointer relative">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <FileImage size={32} className="mx-auto text-gray-600 group-hover:text-[#D4AF37] mb-3 transition-colors" />
                        <p className="text-sm text-gray-400">Click or drag image file to upload</p>
                        <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    </div>
                  )}

                  {imageSource === 'folder' && (
                    <div className="animate-fade-in">
                      <div className="border-2 border-dashed border-[#333] rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-colors group cursor-pointer relative">
                        <input 
                          type="file" 
                          webkitdirectory="" 
                          directory="" 
                          onChange={handleFolderChange}
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                        <FolderOpen size={32} className="mx-auto text-gray-600 group-hover:text-[#D4AF37] mb-3 transition-colors" />
                        <p className="text-sm text-gray-400">Select a folder to upload multiple images</p>
                        <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">All images in folder will be scanned</p>
                      </div>
                    </div>
                  )}

                  {imageSource === 'photos' && (
                    <div className="animate-fade-in grid grid-cols-3 gap-2 bg-[#1a1a1a] p-3 rounded-lg border border-[#333] max-h-40 overflow-y-auto">
                      {['/images/leather_watch.png', '/images/mens_jewelry.png', '/images/hero_watch.png'].map((img, i) => (
                        <div 
                          key={i} 
                          onClick={() => setForm({ ...form, image: img })}
                          className={`aspect-square bg-black rounded border overflow-hidden hover:border-[#D4AF37] cursor-pointer transition-colors relative group ${form.image === img ? 'border-[#D4AF37]' : 'border-[#333]'}`}
                        >
                          <Image src={img} alt={`Preview ${i}`} width={100} height={100} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                      <div className="aspect-square bg-[#0a0a0a] rounded border border-[#333] border-dashed flex items-center justify-center text-gray-700 hover:text-gray-500 cursor-pointer">
                        <Plus size={20} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-[#222]">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-gray-400 hover:text-white border border-[#333] hover:border-[#555] rounded text-sm uppercase tracking-widest transition-colors">
                Cancel
              </button>
              <button 
                onClick={handlePublish}
                disabled={isPublishing || publishSuccess}
                className={`flex items-center gap-2 px-6 py-2.5 rounded text-black font-bold text-sm uppercase tracking-widest transition-all ${
                  publishSuccess 
                    ? "bg-green-500" 
                    : "bg-[#D4AF37] hover:bg-[#B5952F] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isPublishing ? (
                  <span className="animate-pulse">Publishing...</span>
                ) : publishSuccess ? (
                  <>Published ✓</>
                ) : (
                  <>
                    <Save size={16} /> Publish Product
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
