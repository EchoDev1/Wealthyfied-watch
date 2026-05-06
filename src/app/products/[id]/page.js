"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Star, ShieldCheck, Truck, ShoppingCart, Check, Loader2, ArrowLeft, Heart, Share2, Award, Zap, Minus, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.metadata?.images?.[0] || product.metadata?.image || "/images/leather_watch.png"
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-[#D4AF37] mb-4" size={48} />
        <p className="font-serif italic text-gray-500 tracking-widest">Unveiling Masterpiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-center p-4">
        <h1 className="text-3xl font-serif text-white mb-4">Product Not Found</h1>
        <button onClick={() => router.back()} className="text-[#D4AF37] hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Return to Collection
        </button>
      </div>
    );
  }

  const images = product.metadata?.images || [product.metadata?.image || "/images/leather_watch.png"];

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <button 
          onClick={() => router.back()}
          className="mb-12 flex items-center gap-3 text-gray-500 hover:text-[#D4AF37] transition-all group"
        >
          <div className="h-10 w-10 rounded-full border border-[#222] flex items-center justify-center group-hover:border-[#D4AF37] transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Collection</span>
        </button>

        <div className="space-y-16">
          
          {/* Header Info (Title & Category) */}
          <div className="text-center space-y-4">
            <span className="text-[#D4AF37] uppercase text-[10px] font-black tracking-[0.5em] block animate-fade-in">
              {product.category} COLLECTION
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight animate-slide-up">{product.name}</h1>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex text-[#D4AF37]">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Ref: {product.sku}</span>
            </div>
          </div>

          {/* Premium Image Stack - Shows all photos in their fullness */}
          <div className="space-y-8">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] bg-[#0a0a0a] border border-[#222] overflow-hidden shadow-2xl group">
                <Image 
                  src={img} 
                  alt={`${product.name} - View ${idx + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-[3s] opacity-90 group-hover:opacity-100"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
                {idx === 0 && (
                   <div className="absolute top-8 left-8">
                      <span className="bg-[#D4AF37] text-black text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl">
                         Masterpiece Authenticated
                      </span>
                   </div>
                )}
              </div>
            ))}
          </div>

          {/* Product Narrative & Details */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[3rem] p-8 md:p-16 shadow-2xl space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
               {/* Left: Narrative */}
               <div className="space-y-6">
                 <h3 className="text-white font-serif text-3xl">The Narrative</h3>
                 <p className="text-gray-400 text-lg font-light leading-relaxed">
                   {product.description || "Every Wealthyfied masterpiece is a statement of power and prestige. Meticulously hand-assembled using the world's most precious materials, this piece represents the pinnacle of luxury craftsmanship. Designed for the individual who understands that excellence is not an option, but a requirement."}
                 </p>
                 
                 <div className="flex gap-4 pt-4">
                    <div className="h-12 w-12 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#D4AF37]"><Award size={20} /></div>
                    <div className="h-12 w-12 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#D4AF37]"><ShieldCheck size={20} /></div>
                    <div className="h-12 w-12 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#D4AF37]"><Truck size={20} /></div>
                 </div>
               </div>

               {/* Right: Price & CTA */}
               <div className="bg-[#050505] border border-[#222] rounded-3xl p-8 flex flex-col justify-between">
                  <div className="mb-10">
                    <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-3 block">Acquisition Price</span>
                    <div className="text-5xl font-serif text-[#D4AF37] font-bold tracking-tight">
                      {formatCurrency(product.price)}
                    </div>
                    <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck size={12} className="text-green-500" /> Insured White-Glove Delivery Included
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={`w-full flex items-center justify-center gap-4 py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl ${
                        added 
                          ? "bg-green-500 text-white" 
                          : product.stock === 0 
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-[#D4AF37] text-black hover:bg-white hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
                      }`}
                    >
                      {added ? (
                        <><Check size={20} /> Added to Cart</>
                      ) : product.stock === 0 ? (
                        "Sold Out"
                      ) : (
                        <><ShoppingCart size={20} /> Add to Cart</>
                      )}
                    </button>
                    
                    <button className="w-full py-6 rounded-2xl border border-[#333] text-white font-black uppercase tracking-[0.4em] text-[10px] hover:border-[#D4AF37] transition-all">
                       Contact Private Advisor
                    </button>
                  </div>
               </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#1a1a1a]">
               {[
                 { label: "Craftsmanship", value: "Hand-Assembled" },
                 { label: "Material", value: "Premium Grade" },
                 { label: "Certification", value: "Masterpiece ID" },
                 { label: "Shipping", value: "Global Insured" }
               ].map((spec, i) => (
                 <div key={i} className="text-center">
                    <h4 className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 font-bold">{spec.label}</h4>
                    <p className="text-white text-xs font-black uppercase tracking-tighter">{spec.value}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
