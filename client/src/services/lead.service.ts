import axiosInstance from "../api/axios";
import type { Lead, LeadStats, Pagination } from "../types/lead.types";

interface GetLeadsResponse {
  success: boolean;
  message: string;
  data: {
    leads: Lead[];
    pagination: Pagination;
  };
}

interface GetLeadStatsResponse {
  success: boolean;
  message: string;
  data: LeadStats;
}

export const getLeads = async (
  queryString: string
): Promise<GetLeadsResponse> => {
  const response = await axiosInstance.get(`/leads?${queryString}`);
  return response.data;
};

export const getLeadStats = async (): Promise<GetLeadStatsResponse> => {
  const response = await axiosInstance.get("/leads/stats");
  return response.data;
};

export const getSingleLead = async (id: string) => {
  const response = await axiosInstance.get(`/leads/${id}`);
  return response.data;
};

export const createLead = async (payload: unknown) => {
  const response = await axiosInstance.post("/leads", payload);
  return response.data;
};

export const updateLead = async (id: string, payload: unknown) => {
  const response = await axiosInstance.put(`/leads/${id}`, payload);
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await axiosInstance.delete(`/leads/${id}`);
  return response.data;
};

export const exportLeadsCSV = async (queryString: string = "") => {
  const endpoint = queryString ? `/leads/export/csv?${queryString}` : "/leads/export/csv";
  const response = await axiosInstance.get(endpoint, {
    responseType: "blob",
  });

  // Create downloadable blob link in browser
  const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return true;
};