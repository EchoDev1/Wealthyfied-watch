import Image from "next/image";
import Link from "next/link";
import { Star, Filter, ChevronDown } from "lucide-react";

export const metadata = { title: "Luxury Watches - Wealthyfied Watch" };

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-[#222] pb-6">
        <div>
          <h1 className="text-4xl font-serif text-[#D4AF37] mb-2">Timepiece Collection</h1>
          <p className="text-gray-400 font-light">Explore our masterful luxury watches.</p>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="flex items-center gap-2 border border-[#333] px-4 py-2 rounded-md hover:border-[#D4AF37] transition-colors"><Filter size={16}/> Filter</button>
          <button className="flex items-center gap-2 border border-[#333] px-4 py-2 rounded-md hover:border-[#D4AF37] transition-colors">Sort by Default <ChevronDown size={16}/></button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="group flex flex-col bg-[#121212] border border-[#222] rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors">
            <div className="relative h-80 bg-[#0a0a0a]">
              <Image src="/images/leather_watch.png" alt="Watch" fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-white mb-1">The Submariner Elite {item}</h3>
              <p className="text-sm text-gray-500 mb-3">Ref: WL-40{item}X</p>
              <div className="flex justify-between items-center">
                <span className="text-[#D4AF37] font-semibold text-lg">${1850 + (item * 100)}.00</span>
                <Link href="/cart" className="text-xs uppercase tracking-widest font-bold border-b border-[#D4AF37] text-white hover:text-[#D4AF37] pb-1">Add to Cart</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
