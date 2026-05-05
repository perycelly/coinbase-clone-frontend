import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, LayoutGrid, TrendingUp, PlusCircle } from "lucide-react";
import api from "../lib/api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="border-b border-border bg-bg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-brand font-extrabold text-2xl tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              coinbase
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-text-dim">
              <Link to="/" className="hover:text-text-main transition-colors">Assets</Link>
              <Link to="/?view=gainers" className="hover:text-text-main transition-colors">Trade</Link>
              <Link to="/?view=new" className="hover:text-text-main transition-colors">For You</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 bg-surface border border-border px-4 py-1.5 rounded-full text-xs font-bold text-text-main hover:border-brand transition-all">
                  <div className="w-5 h-5 rounded-full bg-linear-to-tr from-brand to-cyan-400"></div>
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-text-dim hover:text-rose-500 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-text-dim hover:text-text-main px-4 py-2">Sign in</Link>
                <Link to="/register" className="text-sm font-bold bg-brand text-white px-6 py-2 rounded-lg hover:brightness-110 transition-all">Get started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
