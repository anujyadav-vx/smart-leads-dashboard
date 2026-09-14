import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  TrendingUp,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Download,
  Plus,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../store/AuthContext";
import { getLeadStats, exportLeadsCSV } from "../../services/lead.service";
import type { LeadStats } from "../../types/lead.types";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getLeadStats();
      setStats(res.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load dashboard statistics"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleExport = async () => {
    try {
      setExporting(true);
      await exportLeadsCSV();
      toast.success("Leads CSV exported successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  const statusColorMap: Record<string, { bg: string; text: string; dot: string; bar: string }> = {
    New: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      text: "text-blue-700 dark:text-blue-300",
      dot: "bg-blue-500",
      bar: "bg-blue-500",
    },
    Contacted: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      text: "text-amber-700 dark:text-amber-300",
      dot: "bg-amber-500",
      bar: "bg-amber-500",
    },
    Qualified: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      text: "text-emerald-700 dark:text-emerald-300",
      dot: "bg-emerald-500",
      bar: "bg-emerald-500",
    },
    Lost: {
      bg: "bg-rose-50 dark:bg-rose-950/40",
      text: "text-rose-700 dark:text-rose-300",
      dot: "bg-rose-500",
      bar: "bg-rose-500",
    },
  };

  const sourceColors: Record<string, string> = {
    Website: "bg-indigo-500",
    Instagram: "bg-pink-500",
    LinkedIn: "bg-sky-600",
    Facebook: "bg-blue-600",
    Referral: "bg-emerald-500",
    Other: "bg-gray-500",
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide text-indigo-200">
                <Sparkles size={14} className="text-amber-300" />
                Pipeline Intelligence Overview
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome back, {user?.name || "Team Member"} 👋
              </h1>
              <p className="text-indigo-200 text-sm max-w-xl leading-relaxed">
                Here is real-time performance of your sales pipeline, acquisition
                channels, and recent customer leads.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchStats}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-sm transition cursor-pointer"
                title="Refresh Analytics"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <button
                onClick={handleExport}
                disabled={exporting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-sm transition cursor-pointer"
              >
                <Download size={14} />
                {exporting ? "Exporting..." : "Export CSV"}
              </button>

              <Link
                to="/leads"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 text-xs font-bold shadow-md transition"
              >
                <Plus size={15} />
                Manage Leads
              </Link>
            </div>
          </div>
        </div>

        {/* 4 KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Leads */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Leads
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {loading ? "..." : stats?.totalLeads ?? 0}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                Active in pipeline
              </p>
            </div>
          </div>

          {/* Qualified Leads */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Qualified Deals
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Target size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {loading ? "..." : stats?.statusCounts?.Qualified ?? 0}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                High-intent prospects
              </p>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Conversion Rate
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                {loading ? "..." : `${stats?.conversionRate ?? 0}%`}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lead-to-Qualified ratio
              </p>
            </div>
          </div>

          {/* Total Pipeline Value */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Pipeline Value
              </span>
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight truncate">
                {loading ? "..." : formatCurrency(stats?.totalValue ?? 0)}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Estimated deal value
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section: Pipeline Funnel + Acquisition Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline Stage Distribution (2 cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Lead Pipeline Stages
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Prospect progression through the sales cycle
                </p>
              </div>
              <Link
                to="/leads"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                View Leads <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-4">
              {(["New", "Contacted", "Qualified", "Lost"] as const).map(
                (stage) => {
                  const count = stats?.statusCounts?.[stage] ?? 0;
                  const total = stats?.totalLeads || 1;
                  const percentage = Math.round((count / total) * 100);
                  const colors = statusColorMap[stage];

                  return (
                    <div key={stage} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}
                          />
                          {stage}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          <span className="font-bold text-gray-900 dark:text-white">
                            {count}
                          </span>{" "}
                          leads ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Lead Source Breakdown (1 col) */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Acquisition Channels
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Top sources driving new inquiries
              </p>

              <div className="mt-5 space-y-3">
                {stats?.sourceCounts &&
                  Object.entries(stats.sourceCounts).map(([source, count]) => {
                    const total = stats.totalLeads || 1;
                    const pct = Math.round((count / total) * 100);
                    const color = sourceColors[source] || "bg-gray-400";

                    return (
                      <div
                        key={source}
                        className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800/80 last:border-none text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {source}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <span className="text-gray-900 dark:text-white font-bold">
                            {count}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            ({pct}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <Link
                to="/leads"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1.5"
              >
                Filter leads by source <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Leads Activity Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Leads
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Latest customer prospects added to the platform
              </p>
            </div>
            <Link
              to="/leads"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View Full Directory <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 px-3">Lead</th>
                  <th className="pb-3 px-3">Contact</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Source</th>
                  <th className="pb-3 px-3">Value</th>
                  <th className="pb-3 px-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      Loading recent leads...
                    </td>
                  </tr>
                ) : !stats?.recentLeads || stats.recentLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No recent leads recorded.
                    </td>
                  </tr>
                ) : (
                  stats.recentLeads.map((lead) => {
                    const statusColor =
                      statusColorMap[lead.status] || statusColorMap.New;

                    return (
                      <tr
                        key={lead._id}
                        className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition"
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {lead.name.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[180px]">
                              {lead.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300">
                          <div className="truncate max-w-[180px]">
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="text-xs text-gray-400">
                              {lead.phone}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusColor.dot}`}
                            />
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300 text-xs font-medium">
                          {lead.source}
                        </td>

                        <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">
                          {lead.value ? formatCurrency(lead.value) : "$0"}
                        </td>

                        <td className="py-3 px-3 text-right text-xs text-gray-500 dark:text-gray-400">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;