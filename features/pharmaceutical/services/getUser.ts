import api from "@/api/client";
import { IPharmaceutical } from "../types/pharmaceutical";

export const getPharmaceutical = async (
  id: string
): Promise<IPharmaceutical> => {
  try {
    const response = await api.get<IPharmaceutical>(
      `/pharmaceutical/get/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw new Error("Get user failed. Please try again.");
  }
};
