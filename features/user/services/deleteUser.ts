import api from "@/api/client";

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Delete failed. Please try again.");
  }
};
