"use client";

import { ArrowRight, Lock, User as UserIcon, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
    } catch (err) {
      setError(err.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex px-4">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center border-r border-[#333]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"></div>
        <div className="z-10 text-center max-w-md">
          <h2 className="text-4xl font-serif text-[#D4AF37] mb-6">Exclusive Access</h2>
          <p className="text-gray-400 font-light leading-relaxed">
            Join the Wealthyfied elite to track your premium orders, manage your bespoke collection, and receive early access to limited edition timepieces.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8 glass-effect p-8 rounded-xl border border-[#333]/50">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400">
              Sign in to your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-md flex items-start gap-3 text-red-400 text-sm animate-fade-in">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#333] rounded-md bg-[#121212] text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] sm:text-sm transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#333] rounded-md bg-[#121212] text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] sm:text-sm transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 bg-[#121212] border-[#333] rounded text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-[#0a0a0a]"
                />
                <label className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className="font-medium text-[#D4AF37] hover:text-[#B5952F] transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-[#D4AF37] hover:bg-[#B5952F] uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                      <ArrowRight className="h-5 w-5 text-black group-hover:translate-x-1 transition-transform" />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium text-[#D4AF37] hover:text-[#B5952F] hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
