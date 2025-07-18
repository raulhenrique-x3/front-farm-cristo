import api from "@/api/client";
import { IProduct } from "../types/product";

export const getProductByCategory = async (
  category: string
): Promise<IProduct[]> => {
  try {
    const response = await api.get<IProduct[]>(
      `/product/get-by-category/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Get product by category error:", error);
    throw new Error("Get product by category failed. Please try again.");
  }
};
