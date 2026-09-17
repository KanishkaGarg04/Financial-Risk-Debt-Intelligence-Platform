import { useEffect, useState, useCallback } from "react";
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  DollarSign,
  Coins,
  Bitcoin,
  RefreshCw,
  AlertCircle,
  Clock,
  Flame,
} from "lucide-react";
import api from "../../services/api";
import { motion } from "framer-motion";

export default function MarketOverview() {
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMarket = useCallback(async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const res = await api.get("/market");
      setMarket(res.data);
      setError(null);
    } catch (err) {
      console.error("Market data fetch error:", err);
      setError("Unable to sync live market quotes. Backend feed may be temporarily unavailable.");
    } finally {
      setLoading(false);
      if (manual) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMarket();
    const interval = setInterval(() => loadMarket(false), 60000);
    return () => clearInterval(interval);
  }, [loadMarket]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-slate-100/70 rounded-xl p-3 animate-pulse border border-slate-200/50" />
          ))}
        </div>
      </div>
    );
  }

  if (error && !market) {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-amber-600 shrink-0" size={22} />
          <div>
            <p className="text-xs font-semibold text-amber-900">Market Sync Warning</p>
            <p className="text-xs text-amber-700">{error}</p>
          </div>
        </div>
        <button
          onClick={() => loadMarket(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-amber-800 bg-white border border-amber-300 rounded-xl hover:bg-amber-50 transition shrink-0"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          Retry Connection
        </button>
      </div>
    );
  }

  const formatTimestamp = (dateStr) => {
    if (!dateStr) return "Just now";
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    } catch {
      return "Live stream";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-card overflow-hidden"
    >
      {/* Header bar with intelligence metadata */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-800">
            Market Intelligence
          </span>
          <span className="hidden sm:inline-block text-slate-300">•</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline-block font-medium">
            Multi-Asset Benchmark Strip
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock size={12} />
            <span>Updated {formatTimestamp(market?.updatedAt)}</span>
          </div>

          <button
            onClick={() => loadMarket(true)}
            disabled={isRefreshing}
            title="Refresh Quotes"
            className="flex items-center gap-1 p-1.5 rounded-lg text-slate-400 hover:text-prapti-600 hover:bg-prapti-50 transition border border-transparent hover:border-prapti-200 disabled:opacity-50"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-prapti-600" : ""} />
            <span className="text-[10px] font-semibold hidden md:inline">Sync</span>
          </button>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        <MarketCard
          symbol="NIFTY 50"
          type="Equity Index"
          price={market?.nifty?.price}
          change={market?.nifty?.changePercent}
          currency="₹"
          icon={<TrendingUp size={16} className="text-prapti-600" />}
        />

        <MarketCard
          symbol="USD / INR"
          type="Currency Pair"
          price={market?.usdInr?.price}
          currency="₹"
          icon={<DollarSign size={16} className="text-emerald-600" />}
        />

        <MarketCard
          symbol="Gold (Spot)"
          type="Commodity"
          price={market?.gold?.price}
          currency="$"
          suffix=" / oz"
          icon={<Coins size={16} className="text-amber-500" />}
        />

        <MarketCard
          symbol="Bitcoin"
          type="Digital Asset"
          price={market?.bitcoin?.price}
          currency="$"
          change={market?.bitcoin?.changePercent}
          icon={<Bitcoin size={16} className="text-violet-600" />}
        />

        <MarketCard
          symbol="Bank FD"
          type="Fixed Benchmark"
          price={market?.fdRate}
          suffix="% p.a."
          icon={<Landmark size={16} className="text-slate-600" />}
        />
      </div>
    </motion.div>
  );
}

function MarketCard({ symbol, type, price, change, currency = "", suffix = "", icon }) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="group rounded-xl border border-slate-200/70 bg-slate-50/50 p-3.5 hover:bg-white hover:border-prapti-300 hover:shadow-card transition-all duration-200 flex flex-col justify-between">
      {/* Top Row: Symbol & Icon */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <div>
          <p className="text-xs font-bold text-slate-900 tracking-tight leading-none group-hover:text-prapti-600 transition-colors">
            {symbol}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">{type}</p>
        </div>
        <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shadow-xs shrink-0">
          {icon}
        </div>
      </div>

      {/* Bottom Row: Price & Movement */}
      <div className="pt-1">
        <div className="text-base sm:text-lg font-bold text-slate-900 tracking-tight tabular-nums truncate">
          {currency}
          {Number(price || 0).toLocaleString("en-IN", {
            minimumFractionDigits: currency === "$" && price < 10000 ? 2 : 0,
            maximumFractionDigits: 2,
          })}
          {suffix}
        </div>

        {change !== undefined ? (
          <div
            className={`mt-1 inline-flex items-center gap-0.5 text-[11px] font-semibold tabular-nums ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{isPositive ? `+${change}%` : `${change}%`}</span>
          </div>
        ) : (
          <div className="mt-1 text-[10px] text-slate-400 font-medium">
            Realtime Quote
          </div>
        )}
      </div>
    </div>
  );
}