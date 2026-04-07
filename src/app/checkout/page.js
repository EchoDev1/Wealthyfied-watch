import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Secure Checkout - Wealthyfied Watch",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-serif text-[#D4AF37] mb-2">Secure Checkout</h1>
          <p className="text-gray-400 font-light text-sm flex items-center justify-center">
            <ShieldCheck size={16} className="mr-2 text-green-500" />
            256-bit Encrypted Transaction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Order Summary Side */}
          <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
            <div className="bg-[#121212] border border-[#222] rounded-xl p-6">
              <h2 className="text-lg font-serif mb-4 pb-4 border-b border-[#222] text-white">Order Summary</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-md overflow-hidden border border-[#333] bg-black">
                  <Image src="/images/leather_watch.png" alt="Watch" fill className="object-cover opacity-80" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white mb-1">The Executive Chronograph</h3>
                  <p className="text-xs text-gray-500 mb-2">Ref: WX-7832</p>
                  <p className="text-[#D4AF37] font-semibold text-sm">$1,850.00</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-400 border-t border-[#222] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">$1,850.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Shipping (Global)</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (Calculated at next step)</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#222] text-lg font-serif">
                  <span className="text-white">Total</span>
                  <span className="text-[#D4AF37] font-bold">$1,850.00</span>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222] rounded-xl p-6 flex items-start gap-4">
              <Truck className="text-[#D4AF37] shrink-0" size={24} />
              <div>
                <h4 className="text-sm font-bold text-white mb-1 tracking-wide uppercase">Priority Courier Delivery</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Your order will be handled by our white-glove logistics partners. Full tracking and door-to-door insurance included.</p>
              </div>
            </div>
          </div>

          {/* Payment & Delivery Form */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
            <div className="bg-[#121212] border border-[#222] rounded-xl p-6 md:p-8">
              
              {/* Delivery Section */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-xl font-serif text-white">Delivery Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input type="text" placeholder="First Name" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                  <input type="text" placeholder="Last Name" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                  <input type="email" placeholder="Email Address (for tracking)" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors md:col-span-2" />
                  <input type="text" placeholder="Delivery Address" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors md:col-span-2" />
                  <input type="text" placeholder="City" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                  <input type="text" placeholder="Postal Code" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
              </div>

              {/* Payment Gateway Section (Opay / Card style) */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#333] text-white flex items-center justify-center font-bold text-sm border border-[#555]">2</div>
                  <h2 className="text-xl font-serif text-white">Payment Method</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border border-[#D4AF37] rounded-lg bg-[#D4AF37]/5 cursor-pointer transition-all">
                    <input type="radio" name="payment" className="text-[#D4AF37] focus:ring-[#D4AF37] outline-none" defaultChecked />
                    <CreditCard className="mx-4 text-[#D4AF37]" size={24} />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Credit / Debit Card</p>
                      <p className="text-xs text-gray-500">Processed securely</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-[#333] rounded-lg hover:border-[#555] cursor-pointer transition-all bg-[#0a0a0a]">
                    <input type="radio" name="payment" className="text-[#D4AF37] focus:ring-[#D4AF37] outline-none" />
                    <div className="mx-4 font-bold text-[#0DAE4E] text-lg tracking-tighter uppercase">paystack</div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Paystack (Nigeria Friendly)</p>
                      <p className="text-xs text-gray-500">Securely pay via Bank Transfer, USSD, or Card</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-[#333] rounded-lg hover:border-[#555] cursor-pointer transition-all bg-[#0a0a0a]">
                    <input type="radio" name="payment" className="text-[#D4AF37] focus:ring-[#D4AF37] outline-none" />
                    <div className="mx-4 font-bold text-green-500 text-xl italic tracking-tighter">Opay</div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Opay Fast Checkout</p>
                      <p className="text-xs text-gray-500">Pay with your Opay Wallet or Bank Transfer</p>
                    </div>
                  </label>
                </div>


                {/* Card Specific Form */}
                <div className="space-y-5 p-5 bg-[#0a0a0a] border border-[#333] rounded-lg">
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input type="text" placeholder="Card Number" className="w-full bg-transparent border border-[#444] rounded-md pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <input type="text" placeholder="MM / YY" className="w-full bg-transparent border border-[#444] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                    <input type="text" placeholder="CVC" className="w-full bg-transparent border border-[#444] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                  </div>
                  <input type="text" placeholder="Name on Card" className="w-full bg-transparent border border-[#444] rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>

                <div className="mt-8">
                  <button className="w-full bg-[#D4AF37] hover:bg-[#B5952F] text-black font-bold uppercase tracking-widest py-4 rounded-md transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center">
                    Pay $1,850.00 Securely
                    <CheckCircle2 size={18} className="ml-2" />
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By confirming this order, you accept our bespoke return policy and terms of service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
