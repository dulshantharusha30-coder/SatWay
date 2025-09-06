'use client';
import { supabase } from '@/lib/supabase';
export default function LoginPage() {
  async function signInWithGoogle() { await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/auth/callback` } }); }
  return <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-xl text-center"><h1 className="text-3xl font-bold mb-6">Login to SatWay</h1><button onClick={signInWithGoogle} className="w-full bg-dark text-white font-bold py-3 rounded">Sign in with Google</button></div>;
}
