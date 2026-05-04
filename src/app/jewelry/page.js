"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, Package, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function JewelryPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-[#222] pb-6">
        <div>
          <h1 className="text-4xl font-serif text-[#D4AF37] mb-2">Mens Jewelry</h1>
          <p className="text-gray-400 font-light">Elevate your presence with 18k gold and platinum.</p>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="flex items-center gap-2 border border-[#333] px-4 py-2 rounded-md hover:border-[#D4AF37] transition-colors"><Filter size={16}/> Filter</button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p>Curating your collection...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="group flex flex-col bg-[#121212] border border-[#222] rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
              <div className="relative h-80 bg-[#0a0a0a]">
                <Image 
                  src={item.metadata?.image || "/images/mens_jewelry.png"} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.description?.substring(0, 60)}{item.description?.length > 60 ? '...' : ''}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#D4AF37] font-semibold text-lg">₦{parseFloat(item.price).toLocaleString()}</span>
                  <Link href="/cart" className="text-xs uppercase tracking-widest font-bold border-b border-[#D4AF37] text-white hover:text-[#D4AF37] pb-1">Add to Cart</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-[#121212] flex items-center justify-center border border-[#222]">
            <Package size={32} className="text-gray-700" />
          </div>
          <h2 className="text-xl font-serif text-white">No Jewelry Available</h2>
          <p className="text-gray-500 max-w-xs">Our master jewelers are currently crafting new pieces. Please check back soon.</p>
        </div>
      )}
    </div>
  );
}
