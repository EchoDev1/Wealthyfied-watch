"use client";

import Link from "next/link";
import { ArrowRight, Mail, Lock, User as UserIcon, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Initial check for placeholder Supabase config
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      setError("System Database Not Connected. Please configure Supabase in .env.local (Contact System Admin).");
      setLoading(false);
      return;
    }

    try {
      // Create user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (signUpError) throw signUpError;
      
      // Supabase typically sends a confirmation email
      setSuccess(true);
      
      // Auto-redirect to portal after showing message briefly, 
      // only if auto-confirm is enabled in Supabase settings
      if (data.session) {
        setTimeout(() => router.push("/portal"), 1500);
      }
      
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex px-4">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 glass-effect p-8 rounded-xl border border-[#333]">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">Join the Elite</h2>
            <p className="text-sm text-gray-400">Create your Wealthyfied profile</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-md flex items-start gap-3 text-red-400 text-sm animate-fade-in">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-md flex items-start gap-3 text-green-400 text-sm animate-fade-in">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <p>Registration successful! Please check your email for a confirmation link to access the portal.</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-gray-500" /></div>
                  <input 
                    type="text" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#333] rounded-md bg-[#121212] text-white focus:outline-none focus:border-[#D4AF37]" 
                    placeholder="John Doe" 
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-500" /></div>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#333] rounded-md bg-[#121212] text-white focus:outline-none focus:border-[#D4AF37]" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-500" /></div>
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#333] rounded-md bg-[#121212] text-white focus:outline-none focus:border-[#D4AF37]" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-[#D4AF37] hover:bg-[#B5952F] uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Register Account
                  <span className="absolute right-0 inset-y-0 flex items-center pr-3"><ArrowRight className="h-5 w-5 text-black group-hover:translate-x-1 transition-transform" /></span>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/auth" className="font-medium text-[#D4AF37] hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
