"use client";

import { useState, useEffect } from "react";
import { Search, Users, RefreshCcw, Mail, Phone, Calendar, Star, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      // Get all profiles from Supabase
      // Note: In a real app we might join with orders to get total spent
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111] p-8 rounded-2xl border border-[#222]">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">Client Registry</h1>
          <p className="text-gray-500 text-sm">Manage VIP relationships and high-value customer profiles.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={fetchCustomers}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] px-5 py-3 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <RefreshCcw size={18} className={isLoading ? "animate-spin text-[#D4AF37]" : ""} />
            <span className="text-xs font-bold uppercase tracking-widest">Refresh Directory</span>
          </button>
          <div className="bg-[#1a1a1a] border border-[#222] px-6 py-3 rounded-xl text-[#D4AF37] font-black text-xs uppercase tracking-widest flex items-center gap-3">
             <Star size={16} fill="currentColor" />
             {customers.length} Members
          </div>
        </div>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#222] flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0a0a]/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222] rounded-full px-12 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[900px]">
            <thead className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black border-b border-[#222] bg-[#0a0a0a]/50">
              <tr>
                <th className="py-5 px-6">Member Profile</th>
                <th className="py-5 px-6">Contact Info</th>
                <th className="py-5 px-6">VIP Tier</th>
                <th className="py-5 px-6">Joined On</th>
                <th className="py-5 px-6 text-right">Activity</th>
                <th className="py-5 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#151515] transition-all group">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[#D4AF37] font-serif text-xl overflow-hidden">
                        {customer.avatar_url ? (
                          <img src={customer.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          customer.full_name?.charAt(0) || <Users size={20} />
                        )}
                      </div>
                      <div>
                        <span className="text-white font-bold block text-base">{customer.full_name || "New Client"}</span>
                        <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{customer.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 space-y-1">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                       <Mail size={12} className="text-[#D4AF37]/50" /> {customer.id.substring(0, 8)}...
                    </div>
                    {customer.phone_number && (
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                         <Phone size={12} className="text-[#D4AF37]/50" /> {customer.phone_number}
                      </div>
                    )}
                  </td>
                  <td className="py-6 px-6">
                    <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37]">
                      {customer.vip_tier || "Standard Member"}
                    </span>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                       <Calendar size={12} /> {new Date(customer.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                     <span className="text-white font-bold">₦0.00</span>
                     <p className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">Lifetime Spent</p>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <button className="h-10 w-10 flex items-center justify-center bg-[#1a1a1a] border border-[#222] rounded-xl text-gray-600 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-[#0a0a0a] border border-[#222] flex items-center justify-center">
              <Users size={32} className="text-gray-800" />
            </div>
            <div>
              <h3 className="text-gray-400 font-serif text-2xl">Registry Empty</h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto mt-2">
                Clients will appear here automatically as they register on the storefront.
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <RefreshCcw className="animate-spin text-[#D4AF37]" size={40} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600">Syncing Registry...</span>
          </div>
        )}
      </div>
    </div>
  );
}
