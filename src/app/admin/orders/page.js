import { Download, Filter, Search, ShoppingBag } from "lucide-react";

export const metadata = { title: "Orders Management - Wealthyfied Admin" };

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-white">Order Logs</h1>
          <p className="text-gray-400 text-sm">Monitor and manage all client transactions.</p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2 rounded-md text-gray-600 font-bold text-sm uppercase cursor-not-allowed"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-[#121212] border border-[#222] rounded-xl overflow-hidden p-6">
        {/* Search/Filter bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              disabled
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-10 py-2 text-gray-700 text-sm cursor-not-allowed placeholder:text-gray-700"
            />
          </div>
          <button
            disabled
            className="flex items-center gap-2 border border-[#2a2a2a] px-3 py-2 rounded-md text-gray-700 text-sm cursor-not-allowed"
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table header */}
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 uppercase tracking-wider text-xs border-b border-[#222]">
            <tr>
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Client</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
        </table>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <ShoppingBag size={26} className="text-[#333]" />
          </div>
          <h3 className="text-gray-500 font-serif text-xl">No Orders Yet</h3>
          <p className="text-gray-700 text-sm max-w-sm leading-relaxed">
            Customer orders will appear here as soon as they start placing purchases on the storefront.
          </p>
        </div>
      </div>
    </div>
  );
}
