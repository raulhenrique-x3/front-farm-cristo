import api from "@/api/client";
import { ILoginPayload, ILoginResponse } from "../types/auth";

export const login = async (
  payload: ILoginPayload
): Promise<ILoginResponse> => {
  try {
    const response = await api.post<ILoginResponse>("/auth/login/", payload);
    return response.data;
  } catch (error: any) {
    console.log("Login error FULL:", JSON.stringify(error));
    console.log("Request:", error?.config);
    console.log("Code:", error?.code);
    console.log("Message:", error?.message);
    throw new Error("Login failed. Please try again.");
  }
};
