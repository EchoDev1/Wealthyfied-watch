"use client";

import Link from "next/link";
import { Package, ShieldCheck, Clock, MessageSquare, Star, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPortal() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const orders = [];

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setShowSuccess(true);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* Verification Success Message */}
      {showSuccess && (
        <div className="mb-8 bg-green-500/10 border border-green-500/50 p-6 rounded-2xl flex items-center gap-4 text-green-400 animate-slide-up">
          <CheckCircle2 className="shrink-0" size={24} />
          <div>
            <h3 className="font-bold">Email Verified Successfully!</h3>
            <p className="text-sm opacity-90">Your account is now fully active. You can explore the exclusive collection and manage your vault.</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="ml-auto text-xs uppercase font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {/* Header & VIP Banner */}
      <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-8 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent z-0"></div>
        <div className="relative z-10 flex items-center gap-6 mb-6 md:mb-0">
          <div className="h-20 w-20 bg-[#0a0a0a] rounded-full border border-[#D4AF37] flex items-center justify-center font-serif text-3xl font-bold text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            M
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white mb-1">Welcome back, Member</h1>
            <div className="flex items-center gap-2">
              <span className="bg-[#E5E4E2] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full">
                Platinum Member
              </span>
              <span className="text-gray-400 text-sm">Wealthyfied Private Client</span>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <Link href="/contact" className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded uppercase text-xs font-bold tracking-widest hover:bg-[#B5952F] transition-colors">
            <MessageSquare size={16} /> Contact Personal Jeweler
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content - Left Col */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order History & Vault */}
          <section className="bg-[#121212] border border-[#222] rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif flex items-center gap-2">
                <ShieldCheck className="text-[#D4AF37]" /> My Vault
              </h2>
              <Link href="/portal?tab=vault" className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">View All</Link>
            </div>
            
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-[#1a1a1a] rounded-xl border border-[#333] hover:border-[#D4AF37]/40 transition-colors">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="h-12 w-12 bg-black rounded-lg border border-[#222] flex items-center justify-center">
                        <Package className="text-gray-400" size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{order.item}</h4>
                        <p className="text-xs text-gray-500 mt-1">Order {order.id} • {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {order.status}
                      </span>
                      <Link href={`#`} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors">
                        Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-[#1a1a1a] rounded-xl border border-[#333] border-dashed">
                  <Package className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">Your acquisition history will appear here once you place your first order.</p>
                </div>
              )}
            </div>
          </section>

          {/* Exclusive Previews */}
          <section className="bg-[#121212] border border-[#222] rounded-2xl overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
             <Image src="/images/hero_watch.png" alt="Preview" width={800} height={300} className="w-full h-64 object-cover object-center opacity-60" />
             <div className="absolute bottom-0 left-0 w-full p-8 z-20">
               <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Platinum Exclusive</span>
               <h3 className="text-3xl font-serif text-white mb-2">The Vanguard Collection</h3>
               <p className="text-gray-300 max-w-lg text-sm mb-4">You have early access to our upcoming collection of limited edition tourbillon watches. Only 50 pieces available worldwide.</p>
               <Link href="/products" className="inline-block border border-[#D4AF37] text-[#D4AF37] px-6 py-2 uppercase text-xs font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all backdrop-blur-sm">
                 Explore Collection
               </Link>
             </div>
          </section>

        </div>

        {/* Right Col - Concierge & Services */}
        <div className="space-y-8">
          
          {/* Client Advisor */}
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 text-center">
            <div className="h-20 w-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#D4AF37]">
              <Image src="/images/leather_watch.png" alt="Advisor" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-xl text-white">Wealthyfied Advisor</h3>
            <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-4">Dedicated Concierge</p>
            <p className="text-gray-400 text-sm mb-6">
              "We are here to assist with curating your collection, providing authenticity certificates, or arranging private viewings."
            </p>
            <div className="space-y-3">
              <Link href="/contact" className="block w-full py-3 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] transition-colors rounded text-sm text-gray-200">
                Schedule Call
              </Link>
              <a href="https://wa.me/wealthyfied" className="block w-full py-3 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] transition-colors rounded text-sm text-gray-200">
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-6">
            <h3 className="font-serif text-lg text-white mb-4">Services</h3>
            <div className="space-y-2">
              <Link href="/contact" className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors border border-[#333]">
                <Clock className="text-[#D4AF37]" size={18} />
                <span className="text-sm text-gray-300">Book Servicing & Polish</span>
              </Link>
              <Link href="/about" className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors border border-[#333]">
                <BookOpen className="text-[#D4AF37]" size={18} />
                <span className="text-sm text-gray-300">Digital Authenticity Library</span>
              </Link>
              <Link href="/products" className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors border border-[#333]">
                <Star className="text-[#D4AF37]" size={18} />
                <span className="text-sm text-gray-300">My Wishlist</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
