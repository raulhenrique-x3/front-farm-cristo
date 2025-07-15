import api from "@/api/client";
import { IRegisterPayload, IRegisterPayloadResponse } from "../types/auth";

export const register = async (
  payload: IRegisterPayload
): Promise<IRegisterPayloadResponse> => {
  try {
    const response = await api.post<IRegisterPayloadResponse>(
      "/register",
      payload,
      {
        params: {
          "x-master-key": "cwlYn4fEsLFgcFMEBW0FLGPLzcOwYagG",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw new Error("Register failed. Please try again.");
  }
};
