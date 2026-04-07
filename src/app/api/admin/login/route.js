import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Fallback credentials if not set in .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ekehwealth@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "COlded9090!";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set secure httpOnly session cookie valid for 8 hours
      const response = NextResponse.json({ success: true, message: "Super Admin identified." });
      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 8,
        path: "/",
      });
      return response;
    }

    // Try Supabase auth for regular admin users
    // Only if Supabase is actually configured.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("placeholder")) {
       const supabase = createClient(supabaseUrl, supabaseAnonKey);

       const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
         email,
         password,
       });

       if (authError || !authData.user) {
         return NextResponse.json({ error: authError?.message || "Invalid email or password." }, { status: 401 });
       }

       // Now check if they have admin role in profiles table
       const { data: profile, error: profileError } = await supabase
         .from('profiles')
         .select('role')
         .eq('id', authData.user.id)
         .single();

       if (profileError || !profile || !['admin', 'compliance'].includes(profile.role)) {
         return NextResponse.json({ error: "Access Denied. Insufficient permissions." }, { status: 403 });
       }

       // Set the same admin_session cookie
       const response = NextResponse.json({ success: true, message: "Database User identified." });
       response.cookies.set("admin_session", "authenticated", {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 60 * 60 * 8,
         path: "/",
       });
       return response;
    }

    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Interal Server error." }, { status: 500 });
  }
}
