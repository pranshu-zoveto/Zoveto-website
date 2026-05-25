"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800/60 bg-zinc-900/50 p-8 shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)] backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-black text-zinc-300 shadow-inner">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-100">Admin Portal</h1>
          <p className="mt-2 text-sm text-zinc-500">Secure access for Zoveto administration.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-200 outline-none transition-colors focus:border-zinc-600 focus:bg-zinc-950"
              placeholder="admin@zoveto.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-200 outline-none transition-colors focus:border-zinc-600 focus:bg-zinc-950"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900 shadow-md transition-all hover:bg-white hover:shadow-lg active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
