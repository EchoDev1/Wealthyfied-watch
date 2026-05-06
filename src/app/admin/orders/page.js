"use client";

import { useState, useEffect } from "react";
import { Download, Filter, Search, ShoppingBag, RefreshCcw, ExternalLink, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'processing': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111] p-8 rounded-2xl border border-[#222]">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">Order Ledger</h1>
          <p className="text-gray-500 text-sm">Real-time transaction monitoring and fulfillment management.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={fetchOrders}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] px-5 py-3 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <RefreshCcw size={18} className={isLoading ? "animate-spin text-[#D4AF37]" : ""} />
            <span className="text-xs font-bold uppercase tracking-widest">Refresh</span>
          </button>
          <button
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-3 rounded-xl text-black font-bold text-xs uppercase tracking-widest transition-all"
          >
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-[#222] flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0a0a]/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Filter by Order ID or Client Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222] rounded-full px-12 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-700"
            />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-[#222]">
                {filteredOrders.length} Transactions Found
             </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[900px]">
            <thead className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black border-b border-[#222] bg-[#0a0a0a]/50">
              <tr>
                <th className="py-5 px-6">Transaction ID</th>
                <th className="py-5 px-6">Client Identity</th>
                <th className="py-5 px-6">Timestamp</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6">Method</th>
                <th className="py-5 px-6 text-right">Revenue</th>
                <th className="py-5 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#151515] transition-all group cursor-pointer">
                  <td className="py-6 px-6 font-mono text-xs text-[#D4AF37]">#{order.id.substring(0, 8).toUpperCase()}</td>
                  <td className="py-6 px-6">
                    <span className="text-white font-medium block">{order.profiles?.full_name || "Guest Client"}</span>
                    <span className="text-[10px] text-gray-600 uppercase tracking-tighter">VIP Standard</span>
                  </td>
                  <td className="py-6 px-6 text-gray-400 text-xs">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="py-6 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-xs uppercase tracking-widest text-gray-500 font-bold">{order.payment_method || "Opay"}</td>
                  <td className="py-6 px-6 text-right text-white font-bold text-lg">{formatCurrency(order.total_amount)}</td>
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

        {filteredOrders.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-[#0a0a0a] border border-[#222] flex items-center justify-center">
              <ShoppingBag size={32} className="text-gray-800" />
            </div>
            <div>
              <h3 className="text-gray-400 font-serif text-2xl">No Transactions Logged</h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto mt-2">
                Order activity will be recorded here in real-time as clients complete their purchases.
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <RefreshCcw className="animate-spin text-[#D4AF37]" size={40} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600">Syncing Ledger...</span>
          </div>
        )}
      </div>
    </div>
  );
}
