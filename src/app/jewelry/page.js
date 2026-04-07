import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";

export const metadata = { title: "Premium Jewelry - Wealthyfied Watch" };

export default function JewelryPage() {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group flex flex-col bg-[#121212] border border-[#222] rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
            <div className="relative h-80 bg-[#0a0a0a]">
              <Image src="/images/mens_jewelry.png" alt="Jewelry" fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-white mb-1">Royal Cuban Link V{item}</h3>
              <p className="text-sm text-gray-500 mb-3">Solid 18K Gold</p>
              <div className="flex justify-between items-center">
                <span className="text-[#D4AF37] font-semibold text-lg">${940 + (item * 50)}.00</span>
                <Link href="/cart" className="text-xs uppercase tracking-widest font-bold border-b border-[#D4AF37] text-white hover:text-[#D4AF37] pb-1">Add to Cart</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
