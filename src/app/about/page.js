import Image from "next/image";
import { Star, ShieldCheck, Globe, Trophy } from "lucide-react";

export const metadata = { title: "Our Story - Wealthyfied Watch" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] selection:bg-[#D4AF37] selection:text-black">
      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-[#222]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_watch.png" 
            alt="Crafting Luxury" 
            fill 
            className="object-cover opacity-20 scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <span className="text-[#D4AF37] uppercase text-xs font-bold tracking-[0.5em] mb-4 block">Est. 2024</span>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6">Our Legacy</h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-left">
            <h2 className="text-4xl font-serif text-[#D4AF37]">The Wealthyfied Standard</h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Founded on the principle that true luxury is defined by unparalleled craftsmanship and uncompromising quality, 
              Wealthyfied Watch stands as a beacon for the modern elite. We do not just sell timepieces; we curate legacies.
            </p>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              In a world of mass production, we celebrate the artisan. Every watch in our vault is a masterwork of horological engineering, 
              designed to tell more than just time—it tells your story.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                   <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0a0a0a] bg-[#111] overflow-hidden">
                      <div className="w-full h-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                        <Star size={14} fill="currentColor" />
                      </div>
                   </div>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Trusted by over 10,000+ Elite Clients</span>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] rounded-3xl border border-[#333] overflow-hidden group shadow-2xl animate-slide-right">
             <Image 
              src="/images/leather_watch.png" 
              alt="Luxury Craft" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif italic text-white text-xl">"True elegance is the only beauty that never fades."</p>
             </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-[#0a0a0a] py-24 border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-6 group">
            <div className="h-20 w-20 mx-auto bg-[#111] rounded-2xl flex items-center justify-center border border-[#222] group-hover:border-[#D4AF37] transition-all duration-500 rotate-3 group-hover:rotate-0">
              <ShieldCheck className="text-[#D4AF37]" size={32} />
            </div>
            <h3 className="text-2xl font-serif text-white">Uncompromising Quality</h3>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Every asset undergoes a 48-point inspection protocol before being admitted to our vault. We only list perfection.
            </p>
          </div>
          <div className="space-y-6 group">
            <div className="h-20 w-20 mx-auto bg-[#111] rounded-2xl flex items-center justify-center border border-[#222] group-hover:border-[#D4AF37] transition-all duration-500 -rotate-3 group-hover:rotate-0">
              <Globe className="text-[#D4AF37]" size={32} />
            </div>
            <h3 className="text-2xl font-serif text-white">Global Reach</h3>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Based in the heart of Lagos with satellite offices in Dubai and London, we serve the global elite with insured worldwide shipping.
            </p>
          </div>
          <div className="space-y-6 group">
            <div className="h-20 w-20 mx-auto bg-[#111] rounded-2xl flex items-center justify-center border border-[#222] group-hover:border-[#D4AF37] transition-all duration-500 rotate-6 group-hover:rotate-0">
              <Trophy className="text-[#D4AF37]" size={32} />
            </div>
            <h3 className="text-2xl font-serif text-white">Exclusive Access</h3>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Our VIP members receive early access to limited edition drops and private viewings in our high-security showroom.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-10">Ready to join the circle?</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/products" className="bg-[#D4AF37] text-black px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl">
            Explore Collection
          </Link>
          <Link href="/contact" className="border border-[#333] text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:border-[#D4AF37] transition-all">
            Contact Concierge
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
