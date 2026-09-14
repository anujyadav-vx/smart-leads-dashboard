import { useEffect, useState, useCallback } from "react";
import {
  Search,
  Plus,
  Download,
  Edit2,
  Trash2,
  Filter,
  X,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from "../../services/lead.service";
import type { Lead, LeadFormData, Pagination } from "../../types/lead.types";
import useDebounce from "../../hooks/useDebounce";
import Modal from "../../components/ui/Modal";
import LeadForm from "../../components/forms/LeadForm";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      query.append("page", String(pagination.page));
      query.append("limit", "10");

      if (debouncedSearch) {
        query.append("search", debouncedSearch);
      }
      if (status) {
        query.append("status", status);
      }
      if (source) {
        query.append("source", source);
      }
      if (sort) {
        query.append("sort", sort);
      }

      const response = await getLeads(query.toString());
      setLeads(response.data.leads);
      setPagination(response.data.pagination);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, debouncedSearch, status, source, sort]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [debouncedSearch, status, source, sort]);

  // Create Lead
  const handleCreateLead = async (data: LeadFormData) => {
    try {
      await createLead(data);
      toast.success("Lead created successfully!");
      setIsCreateOpen(false);
      fetchLeads();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create lead");
      throw error;
    }
  };

  // Edit Lead
  const handleUpdateLead = async (data: LeadFormData) => {
    if (!editingLead) return;
    try {
      await updateLead(editingLead._id, data);
      toast.success("Lead updated successfully!");
      setEditingLead(null);
      fetchLeads();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update lead");
      throw error;
    }
  };

  // Delete Lead
  const handleDeleteLead = async () => {
    if (!deletingLead) return;
    try {
      setIsDeleting(true);
      await deleteLead(deletingLead._id);
      toast.success("Lead deleted successfully!");
      setDeletingLead(null);
      fetchLeads();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete lead");
    } finally {
      setIsDeleting(false);
    }
  };

  // Export CSV
  const handleExport = async () => {
    try {
      setExporting(true);
      const query = new URLSearchParams();
      if (debouncedSearch) query.append("search", debouncedSearch);
      if (status) query.append("status", status);
      if (source) query.append("source", source);
      if (sort) query.append("sort", sort);

      await exportLeadsCSV(query.toString());
      toast.success("CSV export downloaded successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setSource("");
    setSort("latest");
  };

  const hasActiveFilters = Boolean(search || status || source || sort !== "latest");

  const statusColorMap: Record<string, { bg: string; text: string; dot: string }> = {
    New: {
      bg: "bg-blue-50 dark:bg-blue-950/50",
      text: "text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      dot: "bg-blue-500",
    },
    Contacted: {
      bg: "bg-amber-50 dark:bg-amber-950/50",
      text: "text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      dot: "bg-amber-500",
    },
    Qualified: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      text: "text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      dot: "bg-emerald-500",
    },
    Lost: {
      bg: "bg-rose-50 dark:bg-rose-950/50",
      text: "text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      dot: "bg-rose-500",
    },
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Leads Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Organize, filter, track and qualify customer prospects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              fullWidth={false}
              size="md"
              onClick={handleExport}
              disabled={exporting}
            >
              <Download size={16} />
              {exporting ? "Exporting..." : "Export CSV"}
            </Button>

            <Button
              variant="primary"
              fullWidth={false}
              size="md"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus size={16} />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search leads by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="value-high">Highest Deal Value</option>
                <option value="value-low">Lowest Deal Value</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Filter size={14} /> Filter criteria active
              </span>
              <button
                onClick={clearFilters}
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Leads Data Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Lead Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Deal Value</th>
                  <th className="py-3.5 px-4">Added</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="py-4 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-32" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-40" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-16" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-20" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-24" />
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-16 ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="max-w-xs mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
                          <Filter size={24} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          No leads found
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {hasActiveFilters
                            ? "Try adjusting your search criteria or clear active filters."
                            : "Get started by capturing your very first customer lead."}
                        </p>
                        {hasActiveFilters ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            fullWidth={false}
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            fullWidth={false}
                            onClick={() => setIsCreateOpen(true)}
                          >
                            Add New Lead
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const statusStyle =
                      statusColorMap[lead.status] || statusColorMap.New;

                    return (
                      <tr
                        key={lead._id}
                        className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition"
                      >
                        <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {lead.name ? lead.name.slice(0, 2).toUpperCase() : "LD"}
                            </div>
                            <div className="truncate max-w-[180px]">
                              {lead.name}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                            <Mail size={13} className="text-gray-400 shrink-0" />
                            <span className="truncate max-w-[200px]">
                              {lead.email}
                            </span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              <Phone size={11} className="text-gray-400 shrink-0" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                            />
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                            {lead.source}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">
                          {lead.value ? `$${lead.value.toLocaleString()}` : "$0"}
                        </td>

                        <td className="py-3.5 px-4 text-xs text-gray-500 dark:text-gray-400">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingLead(lead)}
                              className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                              title="Edit Lead"
                            >
                              <Edit2 size={16} />
                            </button>

                            <button
                              onClick={() => setDeletingLead(lead)}
                              className="p-1.5 text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div>
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {leads.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {pagination.total}
              </span>{" "}
              leads
            </div>

            <div className="flex items-center gap-2 self-center">
              <button
                disabled={pagination.page <= 1 || loading}
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: Math.max(1, prev.page - 1),
                  }))
                }
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={14} /> Previous
              </button>

              <span className="px-2 font-medium">
                Page {pagination.page} of {pagination.totalPages || 1}
              </span>

              <button
                disabled={
                  pagination.page >= pagination.totalPages || loading
                }
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Create Lead */}
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Add New Customer Lead"
        >
          <LeadForm
            onSubmit={handleCreateLead}
            onCancel={() => setIsCreateOpen(false)}
          />
        </Modal>

        {/* Modal: Edit Lead */}
        <Modal
          isOpen={Boolean(editingLead)}
          onClose={() => setEditingLead(null)}
          title="Edit Lead Information"
        >
          {editingLead && (
            <LeadForm
              key={editingLead._id}
              defaultValues={{
                name: editingLead.name,
                email: editingLead.email,
                phone: editingLead.phone,
                status: editingLead.status,
                source: editingLead.source,
                value: editingLead.value,
                notes: editingLead.notes,
              }}
              onSubmit={handleUpdateLead}
              onCancel={() => setEditingLead(null)}
              isEditing={true}
            />
          )}
        </Modal>

        {/* Modal: Delete Confirmation */}
        <Modal
          isOpen={Boolean(deletingLead)}
          onClose={() => setDeletingLead(null)}
          title="Delete Lead"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-800 dark:text-rose-200 text-sm">
              <AlertTriangle size={20} className="text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">This action cannot be undone.</p>
                <p className="text-xs text-rose-600 dark:text-rose-300 mt-0.5">
                  Are you sure you want to permanently delete{" "}
                  <strong>{deletingLead?.name}</strong> from the database?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                fullWidth={false}
                onClick={() => setDeletingLead(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                fullWidth={false}
                onClick={handleDeleteLead}
                isLoading={isDeleting}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default LeadsPage;