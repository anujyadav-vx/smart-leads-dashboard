import axiosInstance
from "../api/axios";

export const registerUser =
  async (
    payload: unknown
  ) => {

    const response =
      await axiosInstance.post(
        "/auth/register",
        payload
      );

    return response.data;
};

export const loginUser =
  async (
    payload: unknown
  ) => {

    const response =
      await axiosInstance.post(
        "/auth/login",
        payload
      );

    return response.data;
};