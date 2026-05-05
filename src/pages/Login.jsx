import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "motion/react";
import { ChevronRight, Mail, Lock } from "lucide-react";

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/login", formData);
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface p-8 rounded-[32px] border border-border shadow-bento"
      >
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tighter text-text-main uppercase">Welcome back</h1>
          <p className="text-text-dim mt-2 text-xs font-bold uppercase tracking-widest">Connect to your wallet</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Email address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-text-dim" size={18} />
              <input 
                required
                type="email"
                placeholder="your@email.com"
                className="w-full pl-11 pr-4 py-3.5 bg-bg border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold text-text-main placeholder:text-text-dim/30"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-text-dim" size={18} />
              <input 
                required
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-bg border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold text-text-main placeholder:text-text-dim/30"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-down text-xs font-bold bg-down/10 p-3 rounded-xl"
            >
              {error}
            </motion.p>
          )}

          <button 
            disabled={loading}
            className="w-full bg-brand text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
            {!loading && <ChevronRight size={18} />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-text-dim text-xs font-bold uppercase tracking-widest">
            New here?{" "}
            <Link to="/register" className="text-brand hover:underline">
              Join the future
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
