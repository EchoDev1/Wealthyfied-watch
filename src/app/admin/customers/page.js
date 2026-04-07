import { Search, Users } from "lucide-react";

export const metadata = { title: "Customers - Wealthyfied Admin" };

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-white">Client Directory</h1>
          <p className="text-gray-400 text-sm">VIP CRM and account management. Clients populate automatically on signup.</p>
        </div>
        <span className="text-xs text-gray-600 bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full">
          0 Registered Clients
        </span>
      </div>

      <div className="bg-[#121212] border border-[#222] rounded-xl overflow-hidden p-6">
        {/* Search bar — disabled */}
        <div className="relative w-64 mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
          <input
            type="text"
            placeholder="Search clients..."
            disabled
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-10 py-2 text-gray-700 text-sm cursor-not-allowed placeholder:text-gray-700"
          />
        </div>

        {/* Table header */}
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 uppercase tracking-wider text-xs border-b border-[#222]">
            <tr>
              <th className="pb-3 font-medium">Client Name</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Total Spent</th>
              <th className="pb-3 font-medium">Tier</th>
              <th className="pb-3 font-medium">Joined</th>
            </tr>
          </thead>
        </table>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <Users size={26} className="text-[#333]" />
          </div>
          <h3 className="text-gray-500 font-serif text-xl">No Clients Registered</h3>
          <p className="text-gray-700 text-sm max-w-sm leading-relaxed">
            Customers will appear here as they create accounts. VIP tier assignments and spend tracking will update automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
