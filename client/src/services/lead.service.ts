import axiosInstance
from "../api/axios";

export const getLeads =
  async (
    queryString: string
  ) => {

    const response =
      await axiosInstance.get(
        `/leads?${queryString}`
      );

    return response.data;
};

export const createLead =
  async (
    payload: unknown
  ) => {

    const response =
      await axiosInstance.post(
        "/leads",
        payload
      );

    return response.data;
};

export const updateLead =
  async (
    id: string,
    payload: unknown
  ) => {

    const response =
      await axiosInstance.put(
        `/leads/${id}`,
        payload
      );

    return response.data;
};

export const deleteLead =
  async (
    id: string
  ) => {

    const response =
      await axiosInstance.delete(
        `/leads/${id}`
      );

    return response.data;
};

export const exportLeadsCSV =
  async () => {

    const response =
      await axiosInstance.get(
        "/leads/export/csv",
        {
          responseType: "blob"
        }
      );

    return response.data;
};