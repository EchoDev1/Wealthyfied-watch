import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* Quality Seal Badge */}
        <div className="absolute top-6 right-6 md:top-10 md:right-12 z-30 hidden md:flex items-center justify-center group opacity-80 hover:opacity-100 transition-opacity duration-500 hover:scale-105">
          {/* Spinning Outer Ring */}
          <svg width="140" height="140" viewBox="0 0 100 100" className="absolute drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]" style={{ animation: 'spin 20s linear infinite' }}>
            <defs>
              <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9F295" />
                <stop offset="30%" stopColor="#E0AA3E" />
                <stop offset="70%" stopColor="#E0AA3E" />
                <stop offset="100%" stopColor="#B88A44" />
              </linearGradient>
              <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <circle cx="50" cy="50" r="48" fill="#0A0A0A" stroke="url(#heroGold)" strokeWidth="1" />
            <circle cx="50" cy="50" r="43" fill="none" stroke="url(#heroGold)" strokeWidth="1" strokeDasharray="3 3" />
            
            <text fill="url(#heroGold)">
              <textPath href="#circlePath" startOffset="50%" textAnchor="middle" fontSize="9" fontWeight="bold" letterSpacing="4.5">
                • AUTHENTIC • PREMIUM •
              </textPath>
            </text>
          </svg>
          
          {/* Static Center */}
          <div className="relative z-10 flex flex-col items-center justify-center h-[140px] w-[140px] rounded-full drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
            <span className="font-serif text-[#D4AF37] text-3xl font-bold leading-none mb-1">100%</span>
            <span className="text-[#E0AA3E] text-[0.6rem] font-bold tracking-[0.2em] uppercase">Genuine</span>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_watch.png"
            alt="Wealthyfied Luxury Watch Banner"
            fill
            className="object-cover object-center animate-fade-in opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/80 z-10"></div>
        </div>

        <div className="relative z-20 text-center px-4 animate-slide-up mt-20 max-w-4xl mx-auto">
          <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-sm uppercase mb-4 block">
            Elegance Meets Power
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Timepieces for the <br/>
            <span className="text-gradient">Modern Elite</span>
          </h1>
          <p className="text-gray-300 md:text-lg mb-10 max-w-2xl mx-auto font-light">
            Discover our curated collection of masterfully crafted wristwatches and premium men's jewelry. Make a statement that lasts forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-[#D4AF37] text-black px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#B5952F] hover:scale-105 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Explore Watches
            </Link>
            <Link href="/jewelry" className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#D4AF37]/10 transition-colors duration-300 backdrop-blur-sm">
              View Jewelry
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Collection */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Masterpiece Collection</h2>
          <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Watch Product Card */}
          <div className="group relative rounded-xl overflow-hidden bg-[#121212] border border-[#222] hover:border-[#D4AF37]/50 transition-colors duration-500 min-h-[500px] flex flex-col justify-end">
            <div className="absolute inset-0">
              <Image 
                src="/images/leather_watch.png" 
                alt="Classic Leather Gold Dial Watch" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
            </div>
            <div className="relative z-10 p-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[#D4AF37] uppercase text-xs font-bold tracking-wider mb-2 block">Best Seller</span>
                  <h3 className="text-2xl font-serif text-white mb-2">The Executive Chronograph</h3>
                  <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xl font-light">$1,850.00</p>
                </div>
                <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-[#D4AF37] hover:text-black transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Jewelry Product Card */}
          <div className="group relative rounded-xl overflow-hidden bg-[#121212] border border-[#222] hover:border-[#D4AF37]/50 transition-colors duration-500 min-h-[500px] flex flex-col justify-end">
            <div className="absolute inset-0">
              <Image 
                src="/images/mens_jewelry.png" 
                alt="Premium Men's Gold Chain" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
            </div>
            <div className="relative z-10 p-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[#a3a3a3] uppercase text-xs font-bold tracking-wider mb-2 block">New Arrival</span>
                  <h3 className="text-2xl font-serif text-white mb-2">Royal Cuban Link</h3>
                  <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-xl font-light">$940.00</p>
                </div>
                <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-[#D4AF37] hover:text-black transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values / Features */}
      <section className="border-t border-[#222] bg-[#0f0f0f] py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6">
            <div className="h-16 w-16 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#333] mb-6">
              <span className="text-[#D4AF37] text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-serif mb-2">Express Delivery</h3>
            <p className="text-gray-400 text-sm">Insured global shipping. Fast & Secure.</p>
          </div>
          <div className="p-6">
            <div className="h-16 w-16 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#333] mb-6">
              <span className="text-[#D4AF37] text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-serif mb-2">Premium Materials</h3>
            <p className="text-gray-400 text-sm">18K Gold, Sapphire glass, and Surgical steel.</p>
          </div>
          <div className="p-6">
            <div className="h-16 w-16 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#333] mb-6">
              <span className="text-[#D4AF37] text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-serif mb-2">Secure Payments</h3>
            <p className="text-gray-400 text-sm">Protected by industry-leading encryption.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
