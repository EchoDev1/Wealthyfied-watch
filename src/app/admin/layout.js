"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package, ShoppingCart, MessageSquare, Settings, LogOut, FileEdit, Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/auth");
  };

  const navLinks = [
    { href: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/admin/orders", icon: <ShoppingCart size={18} />, label: "Orders" },
    { href: "/admin/products", icon: <Package size={18} />, label: "Products" },
    { href: "/admin/customers", icon: <Users size={18} />, label: "Customers" },
    { href: "/admin/chat", icon: <MessageSquare size={18} />, label: "Compliance Chat", badge: true },
    { href: "/admin/content", icon: <FileEdit size={18} />, label: "Content Manager" },
    { href: "/admin/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505]">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#0a0a0a] sticky top-0 z-40">
        <span className="font-serif text-[#D4AF37] font-bold tracking-widest uppercase">Admin Panel</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar (Fixed on Mobile when open, Static on Desktop) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 border-r border-[#222] bg-[#0a0a0a] flex flex-col h-full md:h-[calc(100vh-80px)] md:sticky md:top-20
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 md:p-6 overflow-y-auto flex-1">
          <p className="text-xs uppercase tracking-widest text-[#a3a3a3] font-semibold mb-6">Management</p>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                   pathname === link.href ? "text-[#D4AF37] bg-[#1a1a1a]" : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                }`}
              >
                {link.icon}
                <span className="text-sm font-medium">{link.label}</span>
                {link.badge && <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-[#222]">
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
