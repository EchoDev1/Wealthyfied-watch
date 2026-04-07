import { Save, ShieldCheck } from "lucide-react";

export const metadata = { title: "Settings - Wealthyfied Admin" };

function GatewayCard({ name, color, badgeText, badgeStyle, checkboxId, checkboxName, defaultChecked, description, fields, warning }) {
  return (
    <div className="border border-[#333] rounded-lg p-5 hover:border-[#444] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`font-bold text-lg tracking-widest mb-1 flex items-center gap-2 ${color}`}>
            {name}
            <span className={`text-[0.6rem] px-2 py-1 rounded-full font-bold ${badgeStyle}`}>{badgeText}</span>
          </h3>
          <p className="text-gray-400 text-xs">{description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className="text-xs text-gray-500">Off</span>
          <div className="relative inline-block w-12 align-middle select-none">
            <input
              type="checkbox"
              name={checkboxName}
              id={checkboxId}
              defaultChecked={defaultChecked}
              className="sr-only peer"
            />
            <label
              htmlFor={checkboxId}
              className="block h-6 w-12 rounded-full bg-[#333] cursor-pointer peer-checked:bg-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-6"
            />
          </div>
          <span className="text-xs text-gray-500">On</span>
        </div>
      </div>

      <div className="space-y-4 mt-4 pt-5 border-t border-[#222]">
        {fields.map((field, i) => (
          <div key={i}>
            <label className="text-xs text-gray-500 font-mono flex items-center gap-1 mb-1">
              <ShieldCheck size={12} /> {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              className="w-full bg-[#0a0a0a] border border-[#333] rounded text-white text-xs font-mono px-3 py-2.5 focus:border-[#D4AF37] outline-none transition-colors"
            />
          </div>
        ))}

        {warning && (
          <p className="text-[0.65rem] text-yellow-600 mt-1">⚠ {warning}</p>
        )}

        <div className="flex justify-end pt-2">
          <button className="bg-[#1a1a1a] border border-[#333] hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all px-5 py-2 rounded uppercase tracking-widest text-xs font-bold flex items-center gap-2">
            <Save size={14} /> Save {name} Config
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const gateways = [
    {
      name: "Paystack",
      color: "text-[#0DAE4E]",
      badgeText: "ACTIVE",
      badgeStyle: "bg-green-500/10 text-green-500",
      checkboxId: "toggle_paystack",
      checkboxName: "toggle_paystack",
      defaultChecked: true,
      description: "Nigerian-friendly gateway — supports Cards, Bank Transfer & USSD.",
      fields: [
        { label: "Public Key",  type: "text",     placeholder: "pk_live_XXXXXXXXXXXXXXXXXXXX", defaultValue: "pk_test_a1b2c3d4e5f6" },
        { label: "Secret Key",  type: "password",  placeholder: "sk_live_XXXXXXXXXXXXXXXXXXXX", defaultValue: "sk_test_1234567890ab" },
      ],
    },
    {
      name: "Opay",
      color: "text-green-400",
      badgeText: "ACTIVE",
      badgeStyle: "bg-green-500/10 text-green-500",
      checkboxId: "toggle_opay",
      checkboxName: "toggle_opay",
      defaultChecked: true,
      description: "Opay Wallet payments, bank transfers, and direct local bank debits.",
      fields: [
        { label: "Merchant ID",  type: "text",     placeholder: "Enter your Opay Merchant ID",        defaultValue: "" },
        { label: "Public Key",   type: "text",     placeholder: "OPAY_PUB_XXXXXXXXXXXXXXXXXXXX",       defaultValue: "" },
        { label: "Secret Key",   type: "password", placeholder: "OPAY_SEC_XXXXXXXXXXXXXXXXXXXX",       defaultValue: "" },
      ],
    },
    {
      name: "Stripe",
      color: "text-indigo-400",
      badgeText: "DISABLED",
      badgeStyle: "bg-gray-500/10 text-gray-400",
      checkboxId: "toggle_stripe",
      checkboxName: "toggle_stripe",
      defaultChecked: false,
      description: "Global card processing via debit & credit. Enable when ready to go international.",
      warning: "Toggle ON above to activate Stripe on the checkout page.",
      fields: [
        { label: "Publishable Key", type: "text",     placeholder: "pk_live_XXXXXXXXXXXXXXXXXXXX", defaultValue: "" },
        { label: "Secret Key",      type: "password", placeholder: "sk_live_XXXXXXXXXXXXXXXXXXXX", defaultValue: "" },
        { label: "Webhook Secret",  type: "password", placeholder: "whsec_XXXXXXXXXXXXXXXXXX",     defaultValue: "" },
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl animate-fade-in">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Platform Settings</h1>
        <p className="text-gray-400 text-sm">Manage payment providers, API keys, and platform configurations.</p>
      </div>

      {/* General Settings */}
      <div className="bg-[#121212] border border-[#222] rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-serif text-white border-b border-[#222] pb-4">General Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Store Name</label>
            <input type="text" defaultValue="Wealthyfied Watch" className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Concierge Email</label>
            <input type="email" defaultValue="concierge@wealthyfied.com" className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Store Currency</label>
            <select className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors">
              <option value="NGN">NGN — Nigerian Naira</option>
              <option value="USD">USD — US Dollar</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Support WhatsApp</label>
            <input type="text" placeholder="+234 800 000 0000" className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-2.5 rounded text-black font-bold uppercase tracking-widest text-sm transition-colors">
            <Save size={16} /> Save General
          </button>
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="bg-[#121212] border border-[#222] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#222] pb-4">
          <h2 className="text-xl font-serif text-white">Payment Gateways</h2>
          <span className="text-xs text-gray-500 bg-[#1a1a1a] border border-[#333] px-3 py-1 rounded-full">Admin Only</span>
        </div>
        <p className="text-gray-500 text-xs -mt-2">Toggle, configure, and manage all payment providers from here. Changes take effect immediately on checkout.</p>

        <div className="space-y-5">
          {gateways.map((gw) => (
            <GatewayCard key={gw.name} {...gw} />
          ))}
        </div>
      </div>

      {/* Supabase / API */}
      <div className="bg-[#121212] border border-[#222] rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-serif text-white border-b border-[#222] pb-4">API Configurations</h2>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Supabase Project URL</label>
          <input type="text" placeholder="https://xxx.supabase.co" disabled className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-md px-4 py-2.5 text-gray-600 cursor-not-allowed" />
          <p className="text-[0.65rem] text-red-400">Requires super-admin access via server environment to modify.</p>
        </div>
      </div>

      {/* Change Admin Password */}
      <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-xl p-6 space-y-5">
        <div className="border-b border-[#222] pb-4">
          <h2 className="text-xl font-serif text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#D4AF37]" /> Change Admin Password
          </h2>
          <p className="text-gray-500 text-xs mt-1">Logged in as: <span className="text-[#D4AF37] font-mono">ekehwealth@gmail.com</span></p>
        </div>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold block mb-2">Current Password</label>
            <input type="password" placeholder="Enter current password" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold block mb-2">New Password</label>
            <input type="password" placeholder="Enter new password" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold block mb-2">Confirm New Password</label>
            <input type="password" placeholder="Repeat new password" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div className="flex justify-end pt-2">
            <button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B5952F] px-6 py-2.5 rounded text-black font-bold text-sm uppercase tracking-widest transition-colors">
              <Save size={14} /> Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
