import { TrendingUp, DollarSign, Package, Activity, ShoppingBag, Users, ClipboardList } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue",    value: "$0.00",  icon: DollarSign,  sub: "No transactions yet"   },
    { label: "Active Orders",    value: "0",       icon: Package,     sub: "No orders placed yet"  },
    { label: "Registered Users", value: "0",       icon: Users,       sub: "Awaiting first signup" },
    { label: "Conversion Rate",  value: "0.0%",    icon: TrendingUp,  sub: "No data available"     },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif mb-1">Director's Overview</h1>
        <p className="text-gray-400 text-sm">Welcome to the Wealthyfied admin panel. Data will populate as users interact with the platform.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#121212] border border-[#222] p-6 rounded-xl hover:border-[#D4AF37]/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333]">
                <stat.icon size={20} className="text-[#D4AF37]" />
              </div>
              <span className="text-xs text-gray-600 bg-[#1a1a1a] px-2 py-1 rounded-full border border-[#2a2a2a]">Live</span>
            </div>
            <h3 className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-widest">{stat.label}</h3>
            <p className="text-2xl font-serif text-gray-600 mb-1">{stat.value}</p>
            <p className="text-[0.65rem] text-gray-700">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders — Empty State */}
      <div className="bg-[#121212] border border-[#222] rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#222] flex justify-between items-center">
          <h2 className="text-lg font-serif">Recent Orders</h2>
          <span className="text-xs text-gray-600 uppercase tracking-widest">0 records</span>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-2">
            <ShoppingBag size={28} className="text-[#333]" />
          </div>
          <h3 className="text-gray-500 font-serif text-xl">No Orders Yet</h3>
          <p className="text-gray-700 text-sm max-w-xs leading-relaxed">
            Once customers start placing orders, they'll appear here with full details including status, amount, and tracking.
          </p>
        </div>
      </div>

      {/* Advanced sections — Empty State grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* VIP Clients — Empty */}
        <div className="lg:col-span-2 bg-[#121212] border border-[#222] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-serif">VIP Client Insights</h2>
            <span className="text-xs text-gray-600 uppercase tracking-widest">0 clients</span>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-1">
              <Users size={24} className="text-[#333]" />
            </div>
            <h3 className="text-gray-500 font-serif text-lg">No VIP Clients Yet</h3>
            <p className="text-gray-700 text-xs max-w-xs leading-relaxed">
              High-value customers will be surfaced here automatically once they start purchasing.
            </p>
          </div>
        </div>

        {/* Inventory Watchlist — Empty */}
        <div className="bg-[#121212] border border-[#222] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-serif">Inventory Watchlist</h2>
            <Activity size={16} className="text-[#333]" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-8">
            <div className="h-14 w-14 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-1">
              <ClipboardList size={22} className="text-[#333]" />
            </div>
            <h3 className="text-gray-500 font-serif">No Stock Alerts</h3>
            <p className="text-gray-700 text-xs leading-relaxed">
              Low-stock alerts for products will appear here once inventory is added.
            </p>
          </div>
          <button disabled className="mt-4 w-full py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-700 cursor-not-allowed uppercase tracking-widest text-xs font-bold rounded-lg">
            Restock Report
          </button>
        </div>
      </div>
    </div>
  );
}
