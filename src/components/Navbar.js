"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Settings, Search, Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "glass-effect border-b border-[#333333]/50 py-2" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="40" height="40" md-width="48" md-height="48" viewBox="0 0 100 100" className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
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
                <text x="50" y="62" fontFamily="serif" fontSize="36" fontWeight="bold" fill="url(#goldGrad)" textAnchor="middle" letterSpacing="2">W</text>
                <circle cx="50" cy="10" r="1.5" fill="url(#goldGrad)" />
                <circle cx="50" cy="90" r="1.5" fill="url(#goldGrad)" />
                <circle cx="10" cy="50" r="1.5" fill="url(#goldGrad)" />
                <circle cx="90" cy="50" r="1.5" fill="url(#goldGrad)" />
              </svg>
              <div className="flex flex-col ml-3">
                <span className="font-serif text-base md:text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase leading-tight">
                  Wealthyfied
                </span>
                <span className="text-[0.5rem] md:text-[0.6rem] text-gray-400 tracking-[0.3em] uppercase leading-tight mt-0.5 block">
                  Exclusive Timepieces
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/products" className="text-xs font-semibold tracking-widest hover:text-[#D4AF37] transition-all">WATCHES</Link>
            <Link href="/jewelry" className="text-xs font-semibold tracking-widest hover:text-[#D4AF37] transition-all">JEWELRY</Link>
            <Link href="/about" className="text-xs font-semibold tracking-widest hover:text-[#D4AF37] transition-all">OUR STORY</Link>
            <Link href="/contact" className="text-xs font-semibold tracking-widest hover:text-[#D4AF37] transition-all">CONTACT</Link>
          </div>

          {/* Desktop Icons & Menu Overlay Control */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <button className="text-gray-300 hover:text-[#D4AF37] transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            
            {/* User Portal / Auth Link */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/portal" className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                  <User size={20} />
                  <span className="hidden xl:block text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Portal</span>
                </Link>
                <button 
                  onClick={() => supabase.auth.signOut()}
                  className="text-gray-500 hover:text-red-400 transition-colors hidden sm:block"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/auth" className="text-xs font-bold tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 px-4 py-2 hover:bg-[#D4AF37] hover:text-black transition-all">
                SIGN IN
              </Link>
            )}
            
            <Link href="/cart" className="text-gray-300 hover:text-[#D4AF37] transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Hamburger Button for Mobile */}
            <button 
              className="md:hidden text-gray-300 hover:text-[#D4AF37] transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/admin" className="hidden md:block text-gray-500 hover:text-gray-200 transition-colors">
              <Settings size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0a0a0a] transition-all duration-300 flex flex-col justify-center items-center px-6">
          <div className="w-full max-w-xs mb-12 animate-fade-in">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search collection..." 
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-full py-3 px-12 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col space-y-8 text-center animate-fade-in-up">
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif tracking-[0.2em] text-white hover:text-[#D4AF37]">WATCHES</Link>
            <Link href="/jewelry" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif tracking-[0.2em] text-white hover:text-[#D4AF37]">JEWELRY</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif tracking-[0.2em] text-white hover:text-[#D4AF37]">OUR STORY</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif tracking-[0.2em] text-white hover:text-[#D4AF37]">CONTACT</Link>
            
            {user ? (
              <>
                <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif tracking-[0.2em] text-[#D4AF37] flex items-center justify-center gap-2">
                  <User size={24} /> PORTAL
                </Link>
                <button 
                  onClick={() => {
                    supabase.auth.signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-serif tracking-[0.2em] text-red-500 flex items-center justify-center gap-2"
                >
                  <LogOut size={24} /> SIGN OUT
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif tracking-[0.2em] text-[#D4AF37]">
                SIGN IN
              </Link>
            )}
            
            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-serif tracking-[0.2em] text-gray-500 hover:text-white uppercase mt-10">Admin Access</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
