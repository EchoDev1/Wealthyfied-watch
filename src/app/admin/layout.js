"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, Package, ShoppingCart, MessageSquare, Settings, LogOut, FileEdit } from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/auth");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pt-20 flex bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#222] bg-[#0a0a0a] hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
        <div className="p-6">
          <p className="text-xs uppercase tracking-widest text-[#a3a3a3] font-semibold mb-6">Management</p>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#1a1a1a] text-[#D4AF37] transition-all">
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Orders</span>
            </Link>
            <Link href="/admin/products" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
              <Package size={18} />
              <span className="text-sm font-medium">Products</span>
            </Link>
            <Link href="/admin/customers" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
              <Users size={18} />
              <span className="text-sm font-medium">Customers</span>
            </Link>
            <Link href="/admin/chat" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all relative">
              <MessageSquare size={18} />
              <span className="text-sm font-medium">Compliance Chat</span>
              <span className="absolute top-3 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <Link href="/admin/content" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
              <FileEdit size={18} />
              <span className="text-sm font-medium">Content Manager</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all">
              <Settings size={18} />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#222]">
          <div className="mb-4 px-4">
            <p className="text-[0.65rem] text-gray-600 font-mono truncate">ekehwealth@gmail.com</p>
            <p className="text-[0.6rem] text-[#D4AF37] uppercase tracking-widest font-bold mt-0.5">Super Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-2 rounded-lg hover:bg-red-500/5"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
