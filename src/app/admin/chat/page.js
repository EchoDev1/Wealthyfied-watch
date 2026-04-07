"use client";

import { MessageSquare, MoreVertical, Send, PhoneCall, Video, UserCircle, Search, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function ComplianceChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "System", text: "Compliance recording started. All messages in this room are encrypted and logged for auditing.", time: "09:00 AM", isSystem: true },
    { id: 2, sender: "Arthur Vance", text: "Please review the flagged transaction #TX-9021. It triggered our AML protocol.", time: "09:05 AM", isSystem: false, isOwn: false, initials: "AV" },
    { id: 3, sender: "You", text: "Looking into it now. The IP originates from an unverified location.", time: "09:07 AM", isSystem: false, isOwn: true, initials: "AD" },
    { id: 4, sender: "System", text: "Attachment received: TX-9021_RiskReport.pdf", time: "09:10 AM", isSystem: true },
    { id: 5, sender: "Arthur Vance", text: "Should we freeze the account pending KYC verification?", time: "09:12 AM", isSystem: false, isOwn: false, initials: "AV" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: false,
      isOwn: true,
      initials: "AD"
    }]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-[#121212] border border-[#222] rounded-xl overflow-hidden shadow-2xl">
      
      {/* Sidebar Channels */}
      <div className="w-80 border-r border-[#222] bg-[#0a0a0a] flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-[#222] bg-[#161616]">
          <h2 className="font-serif text-lg text-white mb-4 flex items-center">
            <ShieldIcon className="mr-2 text-[#D4AF37]" size={18} />
            Compliance Center
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            <input type="text" placeholder="Search logs..." className="w-full bg-[#121212] border border-[#333] rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-600 p-2 mb-1">Active Rooms</p>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-left mb-1 transition-colors">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center border border-red-500/50">
                <AlertTriangle size={16} className="text-red-500" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 border-2 border-[#121212] rounded-full"></span>
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-semibold text-white truncate">AML Risk Desk</h4>
              <p className="text-xs text-red-400 truncate">Arthur: Should we freez...</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#1a1a1a] text-left mb-1 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-gray-400 group-hover:text-white border border-[#444]">
              <FileText size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-medium text-gray-300 group-hover:text-white truncate">Audit Logs 2026</h4>
              <p className="text-xs text-gray-500 truncate">System: Weekly backup com...</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#050505]">
        {/* Chat Header */}
        <div className="h-16 border-b border-[#222] bg-[#121212] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              AML Risk Desk
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#333] text-xs font-mono text-gray-400">Class: HIGH_PRIORITY</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-white transition-colors"><PhoneCall size={18} /></button>
            <button className="hover:text-white transition-colors"><Video size={18} /></button>
            <div className="w-px h-6 bg-[#333]"></div>
            <button className="hover:text-white transition-colors"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center">
            <span className="bg-[#1a1a1a] text-gray-500 text-xs px-3 py-1 rounded-full border border-[#333]">
              Today, October 24th
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isSystem ? 'justify-center' : msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              
              {msg.isSystem ? (
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#161616] px-4 py-2 border border-[#222] rounded-md">
                  <ShieldIcon size={14} className="text-[#D4AF37]" />
                  {msg.text} <span className="text-gray-600 ml-2">{msg.time}</span>
                </div>
              ) : (
                <div className={`flex max-w-[75%] gap-3 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!msg.isOwn && (
                    <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-xs font-bold text-gray-400 shrink-0 border border-[#444]">
                      {msg.initials}
                    </div>
                  )}
                  
                  <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-xs font-medium text-gray-400">{msg.isOwn ? 'You' : msg.sender}</span>
                      <span className="text-[10px] text-gray-600">{msg.time}</span>
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.isOwn 
                        ? 'bg-[#D4AF37] text-black rounded-tr-sm shadow-[#D4AF37]/10' 
                        : 'bg-[#1a1a1a] text-gray-300 border border-[#333] rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#121212] border-t border-[#222]">
          <form onSubmit={handleSend} className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type secure message..." 
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all focus:shadow-[0_0_10px_rgba(212,175,55,0.1)]"
              />
              <button 
                type="button"
                className="absolute right-3 top-3.5 text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                <FileText size={18} />
              </button>
            </div>
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-[#D4AF37] text-black w-12 h-[46px] rounded-lg flex items-center justify-center hover:bg-[#B5952F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} className={input.trim() ? "ml-1" : ""} />
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-1">
              <ShieldIcon size={10} /> End-to-end Encrypted Channel
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Quick helper component for ShieldIcon
const ShieldIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);
