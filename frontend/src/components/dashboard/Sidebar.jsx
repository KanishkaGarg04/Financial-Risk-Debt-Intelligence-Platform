import {
  LayoutDashboard,
  BarChart3,
  BrainCircuit,
  TrendingUp,
  FileText,
  History,
  Settings,
  Menu,
  X,
  HardDriveDownload,
  FileSpreadsheet,
  Landmark,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const navSections = [
  {
    category: "Command Center",
    items: [
      {
        icon: LayoutDashboard,
        name: "Dashboard",
        target: "top",
        route: "/dashboard",
      },
      {
        icon: BarChart3,
        name: "Financial Analysis",
        target: "analysis",
      },
      {
        icon: BrainCircuit,
        name: "AI Financial Advisor",
        target: "advisor",
      },
      {
        icon: TrendingUp,
        name: "Investment Planner",
        target: "planner",
      },
      {
        icon: FileText,
        name: "Visual Analytics",
        target: "charts",
      },
    ],
  },
  {
    category: "Intelligence & Vault",
    items: [
      {
        icon: FileSpreadsheet,
        name: "Reports & Dossiers",
        route: "/reports",
      },
      {
        icon: HardDriveDownload,
        name: "Offline Storage",
        route: "/offline",
      },
      {
        icon: History,
        name: "Recent Analysis",
        route: "/history",
        target: "history",
      },
    ],
  },
  {
    category: "System",
    items: [
      {
        icon: Settings,
        name: "Settings",
        route: "/settings",
      },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (item) => {
    setIsOpen(false);

    if (item.route && !item.target) {
      navigate(item.route);
      return;
    }

    if (location.pathname === "/dashboard") {
      if (item.target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (item.target) {
        const element = document.getElementById(item.target);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      if (item.route) {
        navigate(item.route);
      } else {
        navigate(`/dashboard#${item.target}`);
      }
    }
  };

  const isActive = (item) => {
    if (item.route && location.pathname === item.route) return true;
    if (!item.route && item.target === "top" && location.pathname === "/dashboard") return true;
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] rounded-xl bg-white/95 backdrop-blur-md p-2.5 shadow-soft border border-slate-200/80 text-slate-700 hover:text-prapti-600 transition"
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72
          bg-white border-r border-slate-200/90
          flex flex-col z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
          <div
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-prapti-600 to-navy-900 flex items-center justify-center text-white shadow-soft group-hover:shadow-glow transition-all">
              <Landmark size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-prapti-600 transition">
                  Prapti
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-prapti-50 text-prapti-700 border border-prapti-200/60 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-medium mt-0.5">
                Financial Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navSections.map((sec) => (
            <div key={sec.category}>
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 mb-2">
                {sec.category}
              </p>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      className={`
                        w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all group
                        ${
                          active
                            ? "bg-slate-900 text-white shadow-soft font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={18}
                          className={`shrink-0 transition-colors ${
                            active
                              ? "text-prapti-400"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-prapti-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Account & Footer */}
        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-card">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-navy-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {user?.name || "Verified Investor"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.email || "Pro Tier Account"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>

          <div className="mt-3 px-2 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Shield size={11} className="text-emerald-600" /> Bank-Grade Security
            </span>
            <span>v1.2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}