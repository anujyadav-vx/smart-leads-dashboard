export interface Lead {

  _id: string;

  name: string;

  email: string;

  status:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Lost";

  source:
    | "Website"
    | "Instagram"
    | "Referral";

  createdAt: string;
}

export interface Pagination {

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}