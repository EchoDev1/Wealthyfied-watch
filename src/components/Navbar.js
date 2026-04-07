import Link from "next/link";
import { ShoppingBag, User, Settings, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass-effect border-b border-[#333333]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <svg width="48" height="48" viewBox="0 0 100 100" className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9F295" />
                    <stop offset="30%" stopColor="#E0AA3E" />
                    <stop offset="70%" stopColor="#E0AA3E" />
                    <stop offset="100%" stopColor="#B88A44" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="#0A0A0A" stroke="url(#goldGrad)" strokeWidth="2" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="url(#goldGrad)" strokeWidth="1" />
                
                {/* W monogram inside the seal */}
                <text x="50" y="62" fontFamily="serif" fontSize="36" fontWeight="bold" fill="url(#goldGrad)" textAnchor="middle" letterSpacing="2">W</text>
                
                {/* Subtle ornamental dots */}
                <circle cx="50" cy="10" r="1.5" fill="url(#goldGrad)" />
                <circle cx="50" cy="90" r="1.5" fill="url(#goldGrad)" />
                <circle cx="10" cy="50" r="1.5" fill="url(#goldGrad)" />
                <circle cx="90" cy="50" r="1.5" fill="url(#goldGrad)" />
              </svg>
              <div className="hidden sm:flex flex-col ml-3">
                <span className="font-serif text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase leading-tight">
                  Wealthyfied
                </span>
                <span className="text-[0.6rem] text-gray-400 tracking-[0.3em] uppercase leading-tight mt-0.5">
                  Exclusive Timepieces
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/products" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">WATCHES</Link>
            <Link href="/jewelry" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">JEWELRY</Link>
            <Link href="/about" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">OUR STORY</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">CONTACT</Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              <Search size={20} />
            </button>
            {/* User Portal Link */}
            <Link href="/portal" className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
              <User size={20} />
              <span className="hidden lg:block text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Portal</span>
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-[#D4AF37] transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
            <Link href="/admin" className="hidden md:block text-gray-400 hover:text-gray-100 transition-colors">
              <Settings size={18} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
