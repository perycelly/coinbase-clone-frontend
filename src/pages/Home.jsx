import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../lib/api";
import { motion, AnimatePresence } from "motion/react";
import { Plus, TrendingUp, Clock, LayoutGrid, Search } from "lucide-react";

export default function Home() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "all";
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchCryptos = async () => {
    setLoading(true);
    try {
      let endpoint = "/api/crypto";
      if (view === "gainers") endpoint = "/api/crypto/gainers";
      if (view === "new") endpoint = "/api/crypto/new";
      
      const res = await api.get(endpoint);
      setCryptos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, [view]);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main">
            Dashboard
          </h1>
          <p className="text-text-dim text-sm font-medium mt-1">
            Welcome back. Here's what's happening in the markets.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} />
          Add Crypto
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Market Card */}
        <motion.div 
          layout
          className="lg:col-span-8 bg-surface border border-border rounded-3xl overflow-hidden shadow-bento"
        >
          <div className="p-6 border-b border-border/50 flex justify-between items-center bg-surface/50 backdrop-blur-sm">
            <h2 className="text-xs font-bold text-text-dim uppercase tracking-wider">Market Performance</h2>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-text-dim uppercase">Live</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="px-6 py-4 text-xs font-bold text-text-dim uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-dim uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-dim uppercase tracking-wider">24h Change</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-dim uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-6"><div className="h-10 w-40 bg-border/20 rounded-xl"></div></td>
                      <td className="px-6 py-6"><div className="h-4 w-20 bg-border/20 rounded-xl"></div></td>
                      <td className="px-6 py-6"><div className="h-4 w-16 bg-border/20 rounded-xl"></div></td>
                      <td className="px-6 py-6"><div className="h-8 w-20 bg-border/20 rounded-xl ml-auto"></div></td>
                    </tr>
                  ))
                ) : cryptos.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-text-dim font-medium italic">
                      No assets found. Click "Add Crypto" to start.
                    </td>
                  </tr>
                ) : (
                  cryptos.map((crypto, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      key={crypto.id} 
                      className="hover:bg-white/2 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={crypto.image} alt={crypto.name} className="w-9 h-9 rounded-full object-cover border border-border" />
                          <div>
                            <p className="font-bold text-text-main text-sm">{crypto.name}</p>
                            <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-text-main text-sm">
                        ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">
                        <span className={`${crypto.change24h.startsWith("+") ? "text-up" : "text-down"} flex items-center gap-1`}>
                          {crypto.change24h.startsWith("+") ? "↑" : "↓"} {crypto.change24h}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-brand text-white px-5 py-1.5 rounded-lg text-xs font-extrabold hover:scale-105 transition-all shadow-lg shadow-brand/10">
                          Trade
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-5">
          {/* Portfolio Summarized Card */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-bento overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-4">Account Overview</h3>
            <div className="space-y-1">
              <div className="text-3xl font-black text-text-main">$12,482.00</div>
              <div className="flex items-center gap-2 text-xs font-bold text-up">
                <TrendingUp size={14} strokeWidth={3} />
                +4.25% (+$512)
              </div>
            </div>
            <div className="flex items-end gap-1.5 mt-8 h-12">
               {[0.4, 0.6, 0.45, 0.7, 0.9, 1].map((h, i) => (
                 <div key={i} className="flex-1 rounded-sm bg-brand" style={{ height: `${h * 100}%`, opacity: 0.2 + (h * 0.8) }}></div>
               ))}
            </div>
          </div>

          {/* Security Center Card */}
          <div className="bg-surface border border-border rounded-3xl p-6 shadow-bento">
            <h3 className="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-4">Security Center</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-up/10 text-up rounded-2xl flex items-center justify-center border border-up/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-main">2FA Active</p>
                <p className="text-[11px] font-medium text-text-dim italic">Account fully secured</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 border border-border rounded-xl text-xs font-bold text-text-main hover:bg-white/5 transition-colors">
              Manage Security
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && <AddCryptoModal onClose={() => setShowAddModal(false)} onAdded={fetchCryptos} />}
      </AnimatePresence>
    </div>
  );
}

function ShieldCheck({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AddCryptoModal({ onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    image: "",
    change24h: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/crypto", formData);
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add crypto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface border border-border rounded-4xl p-8 max-w-md w-full shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-text-dim hover:text-text-main transition-colors">
          <Plus className="rotate-45" size={24} />
        </button>
        <h2 className="text-2xl font-black mb-6 text-text-main uppercase tracking-tighter">New Asset</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Asset Name</label>
            <input 
              required
              placeholder="Bitcoin"
              className="w-full px-4 py-3.5 bg-bg border border-border rounded-2xl text-text-main placeholder:text-text-dim/30 focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Symbol</label>
              <input 
                required
                placeholder="BTC"
                className="w-full px-4 py-3.5 bg-bg border border-border rounded-2xl text-text-main placeholder:text-text-dim/30 focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold uppercase"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Price (USD)</label>
              <input 
                required
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-3.5 bg-bg border border-border rounded-2xl text-text-main placeholder:text-text-dim/30 focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">Image URL</label>
            <input 
              required
              placeholder="https://..."
              className="w-full px-4 py-3.5 bg-bg border border-border rounded-2xl text-text-main placeholder:text-text-dim/30 focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest ml-1">24h Change (%)</label>
            <input 
              required
              placeholder="+2.5"
              className="w-full px-4 py-3.5 bg-bg border border-border rounded-2xl text-text-main placeholder:text-text-dim/30 focus:outline-none focus:ring-2 focus:ring-brand transition-all font-semibold"
              value={formData.change24h}
              onChange={(e) => setFormData({ ...formData, change24h: e.target.value })}
            />
          </div>
          {error && <p className="text-down text-xs font-bold bg-down/10 p-3 rounded-xl">{error}</p>}
          <button 
            disabled={submitting}
            className="w-full bg-brand text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 mt-4 active:scale-95 shadow-xl shadow-brand/20"
          >
            {submitting ? "Processing..." : "Register Asset"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
