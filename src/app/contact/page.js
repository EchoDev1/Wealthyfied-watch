import { Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us - Wealthyfied Watch",
};

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 pb-12 px-4 bg-[#050505]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Contact Info */}
        <div className="space-y-10 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4">Get in Touch</h1>
            <p className="text-gray-400 font-light text-lg">
              Experience our concierge service. Our experts are available 24/7 to assist you directly with inquiries, orders, and bespoke requests.
            </p>
          </div>

          <div className="space-y-6 text-gray-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#121212] border border-[#333] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Company Email</h3>
                <Link href="mailto:concierge@wealthyfied.com" className="text-lg hover:text-[#D4AF37] transition-colors">
                  concierge@wealthyfied.com
                </Link>
                <p className="text-xs text-gray-500 mt-1">General inquiries & Support</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#121212] border border-[#333] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Private Line</h3>
                <Link href="tel:+18005550199" className="text-lg hover:text-[#D4AF37] transition-colors">
                  +1 (800) 555-0199
                </Link>
                <p className="text-xs text-gray-500 mt-1">Available 24/7 for VIP clients</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#121212] border border-[#333] flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Headquarters</h3>
                <p className="text-lg">
                  100 Wealthyfied Avenue<br/>
                  New York, NY 10012
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#121212] p-8 md:p-10 rounded-xl border border-[#222] animate-slide-up shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
          
          <h2 className="text-2xl font-serif text-white mb-8">Send a Message</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">First Name</label>
                <input type="text" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Last Name</label>
                <input type="text" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Email Address</label>
              <input type="email" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Message</label>
              <textarea rows="4" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-md hover:bg-[#B5952F] transition-all flex justify-center items-center shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              Send Message
              <Send size={18} className="ml-2" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
