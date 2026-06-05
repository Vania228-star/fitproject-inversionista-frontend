import { Contenedor } from "@/types/Contenedor";

const API_BASE_URL = "http://localhost:8080/api/v1/contenedores";

export const ContenedorService = {
  obtenerTodos: async (): Promise<Contenedor[]> => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Error al consultar contenedores");
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Falló ContenedorService.obtenerTodos:", error);
      return [];
    }
  }
};