"use client";

import { useState } from "react";
import { Save, Globe, Image, FileText, Phone, Layout, ChevronRight } from "lucide-react";

const inputClass = "w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-700";
const labelClass = "block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2";
const sectionHead = "text-base font-serif text-white border-b border-[#222] pb-3 mb-5";
const cardClass = "bg-[#121212] border border-[#222] rounded-xl p-6 space-y-5";

function SaveBar({ section }) {
  return (
    <div className="flex justify-end pt-4">
      <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-2.5 rounded text-black font-bold uppercase tracking-widest text-xs transition-colors">
        <Save size={14} /> Save {section}
      </button>
    </div>
  );
}

const TABS = [
  { id: "hero",    label: "Hero Section",  icon: Image    },
  { id: "header",  label: "Header / Nav",  icon: Layout   },
  { id: "story",   label: "Our Story",     icon: FileText },
  { id: "contact", label: "Contact Page",  icon: Phone    },
];

export default function ContentManagerPage() {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif text-white mb-1">Content Manager</h1>
        <p className="text-gray-400 text-sm">Edit all public-facing pages and components directly from here.</p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Globe size={12} /> <span>wealthyfied.com</span>
        <ChevronRight size={12} />
        <span className="text-[#D4AF37]">{TABS.find(t => t.id === activeTab)?.label}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#222] pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all -mb-px ${
              activeTab === tab.id
                ? "border-[#D4AF37] text-[#D4AF37]"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── HERO SECTION ─── */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHead}>Hero Badge & Headline</h3>
            <div>
              <label className={labelClass}>Badge Text (above headline)</label>
              <input type="text" defaultValue="Elegance Meets Power" className={inputClass} placeholder="e.g. Elegance Meets Power" />
            </div>
            <div>
              <label className={labelClass}>Main Headline (Line 1)</label>
              <input type="text" defaultValue="Timepieces for the" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Main Headline (Highlighted Line 2)</label>
              <input type="text" defaultValue="Modern Elite" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Subtitle / Description</label>
              <textarea
                rows={3}
                defaultValue="Discover our curated collection of masterfully crafted wristwatches and premium men's jewelry. Make a statement that lasts forever."
                className={`${inputClass} resize-none`}
              />
            </div>
            <SaveBar section="Headline" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Call-to-Action Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Primary CTA Label</label>
                <input type="text" defaultValue="Explore Watches" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Primary CTA Link</label>
                <input type="text" defaultValue="/products" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Secondary CTA Label</label>
                <input type="text" defaultValue="View Jewelry" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Secondary CTA Link</label>
                <input type="text" defaultValue="/jewelry" className={inputClass} />
              </div>
            </div>
            <SaveBar section="CTAs" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Stamp Badge (Top-Right Seal)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Badge Main Text</label>
                <input type="text" defaultValue="100%" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Badge Sub Text</label>
                <input type="text" defaultValue="Genuine" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Orbiting Ring Text</label>
                <input type="text" defaultValue="• AUTHENTIC • PREMIUM •" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Badge Visibility</label>
                <select className={inputClass}>
                  <option>Visible</option>
                  <option>Hidden</option>
                </select>
              </div>
            </div>
            <SaveBar section="Badge" />
          </div>
        </div>
      )}

      {/* ─── HEADER / NAV ─── */}
      {activeTab === "header" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHead}>Logo & Brand Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Brand Name</label>
                <input type="text" defaultValue="Wealthyfied" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Logo Tagline</label>
                <input type="text" defaultValue="Exclusive Timepieces" className={inputClass} />
              </div>
            </div>
            <SaveBar section="Logo" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Navigation Links</h3>
            <p className="text-gray-600 text-xs -mt-3 mb-4">Edit the label and destination of each nav link.</p>
            {[
              { label: "Watches", href: "/products" },
              { label: "Jewelry", href: "/jewelry" },
              { label: "Our Story", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 pb-4 border-b border-[#1e1e1e] last:border-0">
                <div>
                  <label className={labelClass}>Label</label>
                  <input type="text" defaultValue={link.label} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>URL / Path</label>
                  <input type="text" defaultValue={link.href} className={inputClass} />
                </div>
              </div>
            ))}
            <SaveBar section="Navigation" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Announcement Banner</h3>
            <div>
              <label className={labelClass}>Banner Message (leave blank to hide)</label>
              <input type="text" placeholder="e.g. Free shipping on orders over ₦500,000" className={inputClass} />
            </div>
            <SaveBar section="Banner" />
          </div>
        </div>
      )}

      {/* ─── OUR STORY ─── */}
      {activeTab === "story" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHead}>Page Headline</h3>
            <div>
              <label className={labelClass}>Page Title</label>
              <input type="text" defaultValue="Our Story" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Subtitle Line</label>
              <input type="text" defaultValue="Crafted with purpose. Built for those who lead." className={inputClass} />
            </div>
            <SaveBar section="Headline" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Brand Story Content</h3>
            <div>
              <label className={labelClass}>Introduction Paragraph</label>
              <textarea rows={5} className={`${inputClass} resize-none`}
                defaultValue="Wealthyfied was born from a singular vision — to bring the world's most exclusive wristwatches and men's jewelry to those who understand that time is not just measured, it is worn. Founded in Lagos, we bridge the gap between global luxury and African premium taste."
              />
            </div>
            <div>
              <label className={labelClass}>Body / Full Story</label>
              <textarea rows={8} className={`${inputClass} resize-none`}
                placeholder="Tell your brand's full story here..."
              />
            </div>
            <div>
              <label className={labelClass}>Mission Statement</label>
              <textarea rows={3} className={`${inputClass} resize-none`}
                placeholder="Our mission is..."
              />
            </div>
            <SaveBar section="Story" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Brand Values (3 Pillars)</h3>
            {["Craftsmanship", "Authenticity", "Exclusivity"].map((val, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-[#1e1e1e] last:border-0">
                <div>
                  <label className={labelClass}>Value Title</label>
                  <input type="text" defaultValue={val} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <input type="text" placeholder="Describe this brand value..." className={inputClass} />
                </div>
              </div>
            ))}
            <SaveBar section="Values" />
          </div>
        </div>
      )}

      {/* ─── CONTACT PAGE ─── */}
      {activeTab === "contact" && (
        <div className="space-y-6">
          <div className={cardClass}>
            <h3 className={sectionHead}>Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" defaultValue="concierge@wealthyfied.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="text" placeholder="+234 800 000 0000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <input type="text" placeholder="+234 800 000 0000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Business Hours</label>
                <input type="text" defaultValue="Mon – Sat, 9am – 6pm WAT" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Physical Address</label>
              <textarea rows={2} className={`${inputClass} resize-none`} placeholder="16 Adeola Odeku Street, Victoria Island, Lagos" />
            </div>
            <SaveBar section="Contact Details" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["Instagram", "Twitter / X", "Facebook", "TikTok", "YouTube"].map((platform) => (
                <div key={platform}>
                  <label className={labelClass}>{platform} URL</label>
                  <input type="url" placeholder={`https://${platform.toLowerCase().split(" ")[0]}.com/wealthyfied`} className={inputClass} />
                </div>
              ))}
            </div>
            <SaveBar section="Social Links" />
          </div>

          <div className={cardClass}>
            <h3 className={sectionHead}>Contact Page Headline</h3>
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" defaultValue="Get In Touch" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Subheading</label>
              <input type="text" defaultValue="Our concierge team is available to assist you with enquiries, orders, and private appointments." className={inputClass} />
            </div>
            <SaveBar section="Contact Page" />
          </div>
        </div>
      )}
    </div>
  );
}
