import { Bell, Sparkles, CheckCircle2, User, Settings, LogOut, ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ title = "Financial Command Center", subtitle = "AI-powered wealth analytics, real-time market indicators, and portfolio intelligence." }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        {/* Left: Title & Status */}
        <div className="min-w-0 flex-1 pl-12 lg:pl-0">
          <div className="flex items-center gap-3">
            <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Feed
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
            {subtitle}
          </p>
        </div>

        {/* Right: Date, Notifications, Profile */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          {/* Date Indicator */}
          <div className="hidden md:flex flex-col text-right pr-2 border-r border-slate-200/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Market Session
            </span>
            <span className="text-xs font-semibold text-slate-700 tabular-nums">
              {today}
            </span>
          </div>

          {/* Notification Button & Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-600 transition-all hover:border-prapti-500 hover:text-prapti-600 hover:shadow-soft"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-prapti-600 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-elevated z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Intelligence Alerts
                  </h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-prapti-50 text-prapti-700">
                    2 New
                  </span>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-start gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Market Sync Active</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Real-time quotes refreshed for NIFTY, Gold & Crypto.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <Sparkles size={16} className="text-prapti-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">AI Advisor Online</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">DeepSeek v3 engine ready for portfolio inquiries.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 h-10 pl-2 pr-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all shadow-card"
            >
              <div className="h-6 w-6 rounded-lg bg-navy-900 text-white flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                {user?.name || "Account"}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-elevated z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{user?.name || "Verified Investor"}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email || "user@praptiai.com"}</p>
                </div>
                <div className="pt-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                  >
                    <Settings size={15} className="text-slate-400" />
                    Settings & Security
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}