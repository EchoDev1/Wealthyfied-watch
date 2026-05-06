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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
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
            <Link 
              key={item.id} 
              href={`/products/${item.id}`}
              className="group flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl relative"
            >
              <div className="relative h-96 bg-[#050505] overflow-hidden">
                <Image 
                  src={item.metadata?.images?.[0] || item.metadata?.image || "/images/mens_jewelry.png"} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">View Details</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                  <div className="flex text-[#D4AF37]">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>

                <p className="text-sm text-gray-500 font-light mb-6 line-clamp-2 leading-relaxed">
                  {item.description || "Crafted from 18k solid gold and hand-selected stones, this piece is a testament to timeless elegance."}
                </p>

                <p className="text-xs text-gray-600 mb-6 tracking-[0.2em] uppercase font-bold">Ref: {item.sku}</p>
                
                <div className="mt-auto space-y-6">
                  <div className="flex flex-col border-t border-[#1a1a1a] pt-6">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-black">Price</span>
                    <span className="text-[#D4AF37] font-bold text-3xl">{formatCurrency(item.price)}</span>
                  </div>
                  
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
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
            </Link>
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
    </div>
  );
}
