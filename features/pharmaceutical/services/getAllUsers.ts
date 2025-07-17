import api from "@/api/client";
import { IPharmaceutical } from "../types/pharmaceutical";

export const getAllPharmaceuticals = async (): Promise<IPharmaceutical[]> => {
  try {
    const response = await api.get<IPharmaceutical[]>(
      "/pharmaceutical/get-all"
    );
    return response.data;
  } catch (error) {
    console.error("Get all pharmaceuticals error:", error);
    throw new Error("Get all pharmaceuticals failed. Please try again.");
  }
};
