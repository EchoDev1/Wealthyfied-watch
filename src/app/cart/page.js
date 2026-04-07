import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight } from "lucide-react";

export const metadata = { title: "Your Cart - Wealthyfied Watch" };

export default function CartPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif text-[#D4AF37] mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex bg-[#121212] border border-[#222] rounded-xl p-4 gap-4 items-center">
            <div className="relative w-24 h-24 rounded-md overflow-hidden bg-black shrink-0">
              <Image src="/images/leather_watch.png" alt="Watch" fill className="object-cover opacity-80" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-serif text-white">The Executive Chronograph</h3>
              <p className="text-sm text-gray-500">Ref: WX-7832</p>
            </div>
            <div className="text-right">
              <p className="text-[#D4AF37] font-semibold mb-2">$1,850.00</p>
              <button className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] border border-[#222] p-6 rounded-xl h-fit">
          <h2 className="text-lg font-serif text-white mb-4 border-b border-[#222] pb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-400 border-b border-[#222] pb-4 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-white">$1,850.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="text-green-500">Free VIP</span></div>
          </div>
          <div className="flex justify-between text-lg font-serif mb-8">
            <span className="text-white">Total</span><span className="text-[#D4AF37] font-bold">$1,850.00</span>
          </div>
          <Link href="/checkout" className="w-full flex justify-center items-center py-4 bg-[#D4AF37] hover:bg-[#B5952F] text-black uppercase font-bold tracking-widest rounded-md transition-all">
            Proceed to Checkout <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
