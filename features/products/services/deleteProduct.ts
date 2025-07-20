import api from "@/api/client";

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/product/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Delete failed. Please try again.");
  }
};
