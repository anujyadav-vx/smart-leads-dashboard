export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Lost";

export type LeadSource =
  | "Website"
  | "Instagram"
  | "LinkedIn"
  | "Facebook"
  | "Referral"
  | "Other";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  source: LeadSource;
  value?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadStats {
  totalLeads: number;
  statusCounts: Record<LeadStatus, number>;
  sourceCounts: Record<LeadSource, number>;
  totalValue: number;
  conversionRate: number;
  recentLeads: Lead[];
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  source: LeadSource;
  value?: number;
  notes?: string;
}