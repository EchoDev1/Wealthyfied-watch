"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Filter, ChevronDown, Package, Loader2, ShoppingCart, Plus, Check, X, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/CartContext";

export default function JewelryPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchJewelry() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'jewelry')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching jewelry:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJewelry();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.metadata?.images?.[0] || product.metadata?.image || "/images/mens_jewelry.png"
    });
    
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#222] pb-8 gap-6">
        <div>
          <span className="text-[#D4AF37] uppercase text-xs font-bold tracking-[0.3em] mb-3 block">Mens Collection</span>
          <h1 className="text-5xl font-serif text-white mb-2">Luxury Jewelry</h1>
          <p className="text-gray-500 font-light max-w-md">Exquisite chains, rings, and accessories crafted from the finest gold and precious stones for the modern man of distinction.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-[#222] px-6 py-3 rounded-md hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all bg-[#0f0f0f]">
            <Filter size={16}/> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-[#222] px-6 py-3 rounded-md hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all bg-[#0f0f0f]">
            Sort <ChevronDown size={16}/>
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-500">
          <Loader2 className="animate-spin mb-4 text-[#D4AF37]" size={48} />
          <p className="font-serif italic tracking-widest">Polishing the diamonds...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((item) => (
            <div key={item.id} className="group flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl relative">
              <div className="relative h-96 bg-[#050505] overflow-hidden">
                <Image 
                  src={item.metadata?.images?.[0] || item.metadata?.image || "/images/mens_jewelry.png"} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* View Details Icon (+) */}
                <button 
                  onClick={() => setSelectedProduct(item)}
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D4AF37] hover:text-black"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => setSelectedProduct(item)}>{item.name}</h3>
                  <div className="flex text-[#D4AF37]">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-6 tracking-[0.2em] uppercase font-bold">Ref: {item.sku}</p>
                
                <div className="mt-auto space-y-6">
                  <div className="flex flex-col border-t border-[#1a1a1a] pt-6">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-black">Price</span>
                    <span className="text-[#D4AF37] font-bold text-3xl">{formatCurrency(item.price)}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all ${
                      addedId === item.id 
                        ? "bg-green-500 text-white" 
                        : "bg-white text-black hover:bg-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    }`}
                  >
                    {addedId === item.id ? (
                      <><Check size={16} /> Added to Cart</>
                    ) : (
                      <><ShoppingCart size={16} /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
          <div className="h-24 w-24 rounded-full bg-[#121212] flex items-center justify-center border border-[#222]">
            <Package size={40} className="text-gray-800" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-white mb-2">Vault is Secured</h2>
            <p className="text-gray-500 max-w-xs mx-auto">Our jewelry artisans are currently crafting new pieces. Check back soon for the next collection drop.</p>
          </div>
          <Link href="/" className="text-[#D4AF37] hover:text-white transition-colors uppercase text-sm font-bold tracking-widest border-b border-[#D4AF37]">Return Home</Link>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-[2rem] w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)] relative">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <X size={24} />
            </button>

            {/* Left: Image Gallery */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative bg-black border-r border-[#222]">
              <Image 
                src={selectedProduct.metadata?.images?.[0] || selectedProduct.metadata?.image || "/images/mens_jewelry.png"} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover"
              />
              {selectedProduct.metadata?.images?.length > 1 && (
                <div className="absolute bottom-8 left-8 right-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {selectedProduct.metadata.images.map((img, idx) => (
                    <div key={idx} className="h-20 w-20 shrink-0 rounded-xl border border-white/20 overflow-hidden cursor-pointer hover:border-[#D4AF37] transition-all">
                      <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="mb-10">
                <span className="text-[#D4AF37] uppercase text-[10px] font-black tracking-[0.4em] mb-4 block">Jewelry Masterpiece</span>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">{selectedProduct.name}</h2>
                <div className="flex items-center gap-6">
                  <div className="flex text-[#D4AF37]">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Reference: {selectedProduct.sku}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {selectedProduct.description || "Crafted from 18k solid gold and hand-selected stones, this piece is a testament to timeless elegance. Designed for the individual who appreciates the finer details of master craftsmanship."}
                </p>
                
                <div className="grid grid-cols-2 gap-8 mt-10">
                   <div className="flex items-start gap-4">
                      <ShieldCheck className="text-[#D4AF37] shrink-0" size={24} />
                      <div>
                        <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">Lifetime Warranty</h4>
                        <p className="text-[10px] text-gray-500">Premium Aftercare</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <Truck className="text-[#D4AF37] shrink-0" size={24} />
                      <div>
                        <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">Global Delivery</h4>
                        <p className="text-[10px] text-gray-500">Secure Protocol</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-auto pt-10 border-t border-[#1a1a1a]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block font-black">Acquisition Price</span>
                    <span className="text-white font-bold text-4xl">{formatCurrency(selectedProduct.price)}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(selectedProduct)}
                    className={`flex-1 w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all ${
                      addedId === selectedProduct.id 
                        ? "bg-green-500 text-white" 
                        : "bg-[#D4AF37] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    }`}
                  >
                    {addedId === selectedProduct.id ? (
                      <><Check size={20} /> Added to Cart</>
                    ) : (
                      <><ShoppingCart size={20} /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
