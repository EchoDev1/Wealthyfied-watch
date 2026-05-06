"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="h-24 w-24 bg-[#121212] border border-[#222] rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-600" />
        </div>
        <h1 className="text-3xl font-serif text-white mb-2">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">Your luxury vault is currently empty. Explore our collection to find your next masterpiece.</p>
        <Link href="/products" className="bg-[#D4AF37] hover:bg-[#B5952F] text-black px-8 py-3 rounded-md font-bold uppercase tracking-widest transition-all">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-serif text-[#D4AF37] mb-10 border-b border-[#222] pb-6">Your Selection</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-[#0f0f0f] border border-[#222] rounded-2xl p-6 gap-6 items-center group hover:border-[#D4AF37]/30 transition-all">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-black shrink-0 border border-[#222]">
                <Image 
                  src={item.image || (item.metadata?.image) || "/images/leather_watch.png"} 
                  alt={item.name} 
                  fill 
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-serif text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4 tracking-wider uppercase text-xs">Ref: {item.sku}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center border border-[#333] rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-white font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-3 min-w-[120px]">
                <p className="text-[#D4AF37] font-semibold text-xl">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-xs uppercase tracking-widest font-bold"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-[#0f0f0f] border border-[#222] p-8 rounded-2xl h-fit sticky top-24">
          <h2 className="text-xl font-serif text-white mb-6 border-b border-[#222] pb-4">Order Summary</h2>
          <div className="space-y-4 text-sm text-gray-400 border-b border-[#222] pb-6 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500 font-bold tracking-widest uppercase text-xs">Complimentary VIP</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (VAT)</span>
              <span className="text-white">Included</span>
            </div>
          </div>
          <div className="flex justify-between text-2xl font-serif mb-10">
            <span className="text-white">Total</span>
            <span className="text-[#D4AF37] font-bold">{formatCurrency(cartTotal)}</span>
          </div>
          
          <div className="space-y-4">
            <Link href="/checkout" className="w-full flex justify-center items-center py-5 bg-[#D4AF37] hover:bg-[#B5952F] text-black uppercase font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02]">
              Proceed to Checkout <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link href="/products" className="w-full flex justify-center items-center py-4 text-gray-500 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors">
              Continue Shopping
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-[#222] flex items-center justify-center gap-4 opacity-40">
             <Image src="/images/opay.png" alt="Opay" width={40} height={20} className="grayscale" />
             <Image src="/images/visa.png" alt="Visa" width={40} height={20} className="grayscale" />
             <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={20} className="grayscale" />
          </div>
        </div>
      </div>
    </div>
  );
}
