"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Filter, ChevronDown, Package, Loader2, ShoppingCart, Plus, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchWatches() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'watch')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching watches:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWatches();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.metadata?.image || "/images/leather_watch.png"
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
          <span className="text-[#D4AF37] uppercase text-xs font-bold tracking-[0.3em] mb-3 block">Premium Selection</span>
          <h1 className="text-5xl font-serif text-white mb-2">Timepiece Collection</h1>
          <p className="text-gray-500 font-light max-w-md">Precision-engineered horological masterpieces for those who demand the absolute best in craftsmanship and style.</p>
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
          <p className="font-serif italic tracking-widest">Winding the mechanisms...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((item) => (
            <div key={item.id} className="group flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl">
              <div className="relative h-96 bg-[#050505] overflow-hidden">
                <Image 
                  src={item.metadata?.image || "/images/leather_watch.png"} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quick Add Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 w-[80%]">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 backdrop-blur-md transition-all ${
                      addedId === item.id 
                        ? "bg-green-500 text-white" 
                        : "bg-white text-black hover:bg-[#D4AF37] hover:text-black"
                    }`}
                  >
                    {addedId === item.id ? (
                      <><Check size={16} /> Added</>
                    ) : (
                      <><Plus size={16} /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-white">{item.name}</h3>
                  <div className="flex text-[#D4AF37]">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-6 tracking-[0.2em] uppercase font-bold">Ref: {item.sku}</p>
                
                <div className="flex justify-between items-center mt-auto border-t border-[#1a1a1a] pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Price</span>
                    <span className="text-[#D4AF37] font-bold text-2xl">{formatCurrency(item.price)}</span>
                  </div>
                  <Link 
                    href={`/products/${item.id}`} 
                    className="h-12 w-12 rounded-full border border-[#222] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                  >
                    <Plus size={20} />
                  </Link>
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
            <h2 className="text-2xl font-serif text-white mb-2">The Vault is Locked</h2>
            <p className="text-gray-500 max-w-xs mx-auto">Our current collection is completely sold out. Our master curators are working to restock shortly.</p>
          </div>
          <Link href="/" className="text-[#D4AF37] hover:text-white transition-colors uppercase text-sm font-bold tracking-widest border-b border-[#D4AF37]">Return Home</Link>
        </div>
      )}
    </div>
  );
}
