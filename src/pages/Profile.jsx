import { motion } from "motion/react";
import { User, Mail, ShieldCheck, Calendar, Wallet } from "lucide-react";

export default function Profile({ user }) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-text-main uppercase">Account</h1>
        <p className="text-text-dim mt-2 text-xs font-bold uppercase tracking-widest">Personal settings and wallet preferences</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-4">
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-5 py-4 bg-surface border border-brand/40 text-text-main rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand/10">
              <User size={18} className="text-brand" />
              Identity
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-4 text-text-dim hover:text-text-main hover:bg-surface rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
              <ShieldCheck size={18} />
              Security
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-4 text-text-dim hover:text-text-main hover:bg-surface rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
              <Wallet size={18} />
              Wallets
            </button>
          </nav>
        </aside>

        <main className="md:col-span-2 space-y-8">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface border border-border rounded-3xl p-8 shadow-bento"
          >
            <div className="flex items-center gap-6 mb-12">
              <div className="w-24 h-24 bg-gradient-to-tr from-brand to-cyan-500 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black rotate-3 hover:rotate-0 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter">{user.name}</h2>
                <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full mt-2 w-fit border border-emerald-500/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   Fully Verified
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="p-3.5 bg-bg border border-border rounded-2xl text-text-dim shadow-inner">
                  <User size={20} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest block mb-1">Legal Name</label>
                  <p className="text-lg font-bold text-text-main">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3.5 bg-bg border border-border rounded-2xl text-text-dim shadow-inner">
                  <Mail size={20} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest block mb-1">Authenticated Email</label>
                  <p className="text-lg font-bold text-text-main">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="p-3.5 bg-bg border border-border rounded-2xl text-text-dim shadow-inner">
                  <Calendar size={20} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-dim uppercase tracking-widest block mb-1">Member Since</label>
                  <p className="text-lg font-bold text-text-main opacity-90">
                    {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <footer className="bg-brand rounded-[32px] p-8 text-white shadow-2xl shadow-brand/20 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            <h3 className="text-2xl font-black mb-1 uppercase tracking-tighter">Expand your portfolio</h3>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-6 leading-relaxed">Join the world's most trusted exchange</p>
            <button className="bg-white text-brand px-10 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg">
              Buy Assets
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
