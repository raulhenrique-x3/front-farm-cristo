import api from "@/api/client";
import { ILoginPayload, ILoginResponse } from "../types/auth";

export const login = async (
  payload: ILoginPayload
): Promise<ILoginResponse> => {
  try {
    const response = await api.post<ILoginResponse>("/auth/login/", payload);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please try again.");
  }
};
