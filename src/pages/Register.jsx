import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "motion/react";
import { ChevronRight, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/register", formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
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
          <h1 className="text-3xl font-black tracking-tighter text-text-main uppercase text-balance">Create Account</h1>
          <p className="text-text-dim mt-2 text-[10px] font-bold uppercase tracking-widest text-balance">The easiest way to manage your crypto</p>
        </header>

        {success ? (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/20 rotate-12">
              <User size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-text-main uppercase tracking-tighter">Verified!</h2>
              <p className="text-text-dim text-xs font-bold uppercase tracking-widest px-4">Initializing your dashboard...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-text-dim" size={18} />
                <input 
                  required
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 bg-bg border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold text-text-main placeholder:text-text-dim/30"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-text-dim" size={18} />
                <input 
                  required
                  type="email"
                  placeholder="name@email.com"
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
                  placeholder="Choose a password"
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
              className="w-full bg-brand text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4 shadow-xl shadow-brand/20"
            >
              {loading ? "Provisioning..." : "Start Journey"}
              {!loading && <ChevronRight size={18} />}
            </button>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-border/30 text-center text-[10px] font-bold text-text-dim uppercase tracking-widest">
          Already a member?{" "}
          <Link to="/login" className="text-brand hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
