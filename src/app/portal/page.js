"use client";

import Link from "next/link";
import { Package, ShieldCheck, Clock, MessageSquare, Star, ArrowRight, BookOpen, CheckCircle2, User, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";

function PortalContent() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setShowSuccess(true);
    }
    fetchPortalData();
  }, [searchParams]);

  const fetchPortalData = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setUserProfile(profile);

      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      setUserOrders(orders || []);
    } catch (error) {
      console.error("Error fetching portal data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
        <RefreshCcw className="animate-spin text-[#D4AF37]" size={40} />
        <p className="font-serif italic tracking-widest text-[#D4AF37] uppercase text-sm">Synchronizing Secure Vault...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* Verification Success Message */}
      {showSuccess && (
        <div className="mb-8 bg-green-500/10 border border-green-500/50 p-6 rounded-2xl flex items-center gap-4 text-green-400 animate-slide-up">
          <CheckCircle2 className="shrink-0" size={24} />
          <div className="flex-1">
            <h3 className="font-bold">Email Verified Successfully!</h3>
            <p className="text-sm opacity-90">Your account is now fully active. You can explore the exclusive collection and manage your vault.</p>
          </div>
          <button onClick={() => setShowSuccess(false)} className="text-xs uppercase font-bold hover:underline px-4 py-2 bg-green-500/10 rounded-lg">Dismiss</button>
        </div>
      )}

      {/* Header & VIP Banner */}
      <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-[2rem] p-8 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-transparent z-0"></div>
        <div className="relative z-10 flex items-center gap-6 mb-8 md:mb-0">
          <div className="h-24 w-24 bg-[#0a0a0a] rounded-full border-2 border-[#D4AF37] flex items-center justify-center font-serif text-4xl font-bold text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden">
            {userProfile?.avatar_url ? (
              <img src={userProfile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              userProfile?.full_name?.charAt(0) || "M"
            )}
          </div>
          <div>
            <h1 className="text-4xl font-serif text-white mb-2">Greetings, {userProfile?.full_name?.split(' ')[0] || "Member"}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#D4AF37] text-black text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
                {userProfile?.vip_tier || "Platinum Member"}
              </span>
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] border border-[#333] px-3 py-1.5 rounded-full">
                Vault Status: Secured
              </span>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-xl uppercase text-[10px] font-black tracking-widest hover:bg-white transition-all shadow-xl">
            <MessageSquare size={16} /> Contact Concierge
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content - Left Col */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Order History & Vault */}
          <section className="bg-[#121212] border border-[#222] rounded-[2rem] p-10 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-serif text-white flex items-center gap-3">
                  <ShieldCheck className="text-[#D4AF37]" size={28} /> My Acquisitions
                </h2>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">Chronicle of your luxury investments</p>
              </div>
              <Link href="/products" className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-black border-b border-[#D4AF37] pb-1 hover:text-white hover:border-white transition-all">New Collection</Link>
            </div>
            
            <div className="space-y-6">
              {userOrders.length > 0 ? (
                userOrders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-[#0a0a0a] rounded-2xl border border-[#222] hover:border-[#D4AF37]/50 transition-all group">
                    <div className="flex items-center gap-5 mb-4 sm:mb-0">
                      <div className="h-16 w-16 bg-[#121212] rounded-xl border border-[#333] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Package className="text-[#D4AF37]/50" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-serif text-xl">Order #{order.id.substring(0, 8).toUpperCase()}</h4>
                        <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest font-bold">
                          Placed on {new Date(order.created_at).toLocaleDateString()} • {formatCurrency(order.total_amount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        order.status === 'processing' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {order.status}
                      </span>
                      <Link href={`/portal/orders/${order.id}`} className="text-gray-500 hover:text-[#D4AF37] flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all">
                        VIEW ASSET <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 bg-[#0a0a0a] rounded-[2rem] border border-[#222] border-dashed">
                  <div className="h-20 w-20 bg-[#111] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="text-gray-800" size={32} />
                  </div>
                  <h3 className="text-xl font-serif text-gray-400 mb-2">Vault Empty</h3>
                  <p className="text-gray-600 text-sm max-w-xs mx-auto mb-8 font-light">Your acquisition history will materialize here once you claim your first masterpiece.</p>
                  <Link href="/products" className="bg-[#111] border border-[#333] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                    Enter the Gallery
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Exclusive Previews */}
          <section className="bg-[#121212] border border-[#222] rounded-[2.5rem] overflow-hidden relative group shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity duration-700"></div>
             <Image 
              src="/images/hero_watch.png" 
              alt="Preview" 
              width={1000} 
              height={400} 
              className="w-full h-80 object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-[2000ms]" 
             />
             <div className="absolute bottom-0 left-0 w-full p-10 z-20">
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Platinum Exclusive Access</span>
               <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">The Vanguard Collection</h3>
               <p className="text-gray-400 max-w-xl text-sm mb-8 leading-relaxed font-light">As a valued private client, you have been granted early access to our upcoming collection of limited edition tourbillons. Only 50 units will be struck globally.</p>
               <Link href="/products" className="inline-flex items-center gap-4 bg-[#D4AF37] text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                 Explore the Unknown <ArrowRight size={16} />
               </Link>
             </div>
          </section>

        </div>

        {/* Right Col - Concierge & Services */}
        <div className="space-y-10">
          
          {/* Client Advisor */}
          <div className="bg-[#121212] border border-[#222] rounded-[2rem] p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
            <div className="h-28 w-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-[#D4AF37] p-1 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37]">
                <User size={40} />
              </div>
            </div>
            <h3 className="font-serif text-2xl text-white">Private Advisor</h3>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-6">Concierge Protocol Active</p>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">
              &quot;Greetings. I am here to facilitate authentication protocols, arrange private viewings, or curate your next investment.&quot;
            </p>
            <div className="space-y-4">
              <Link href="/contact" className="block w-full py-4 bg-[#D4AF37] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg">
                Secure Video Consult
              </Link>
              <a href="https://wa.me/wealthyfied" className="block w-full py-4 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white">
                WhatsApp Private Line
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#121212] border border-[#222] rounded-[2rem] p-10 shadow-2xl">
            <h3 className="font-serif text-xl text-white mb-8 border-b border-[#222] pb-6 flex items-center gap-3">
              <Star className="text-[#D4AF37]" size={20} /> VIP Services
            </h3>
            <div className="space-y-3">
              {[
                { icon: <Clock size={18} />, label: "Maintenance & Restoration", href: "/contact" },
                { icon: <BookOpen size={18} />, label: "Digital Authenticity Keys", href: "/about" },
                { icon: <Star size={18} />, label: "Personalized Wishlist", href: "/products" },
                { icon: <ShieldCheck size={18} />, label: "Insured Storage Program", href: "/contact" }
              ].map((service, i) => (
                <Link key={i} href={service.href} className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-2xl hover:bg-[#1a1a1a] transition-all border border-transparent hover:border-[#333] group">
                  <div className="h-10 w-10 rounded-xl bg-[#111] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{service.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function ClientPortal() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-[#D4AF37] font-serif uppercase tracking-widest text-sm">Synchronizing Secure Protocol...</div>}>
      <PortalContent />
    </Suspense>
  );
}
