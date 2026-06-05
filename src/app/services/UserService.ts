import { User } from "@/types/User";

const API_BASE_URL = "http://localhost:8080/api/v1/usuarios";

export const UserService = {
  buscarPorEmail: async (email: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/buscar?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`[QA_WARNING] Usuario no encontrado para el email: ${email}`);
          return null;
        }
        throw new Error(`Error en el servidor: Status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Error en UserService.buscarPorEmail:", error);
      throw error;
    }
  }
};