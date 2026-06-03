import { Inversion } from "@/types/Inversion";

const API_URL = "http://localhost:8080/api/v1/inversiones";

export const InversionService = {
  
  obtenerPorUsuario: async (idUsuario: number): Promise<Inversion[]> => {
    try {
      const response = await fetch(`${API_URL}/usuario/${idUsuario}`);
      if (!response.ok) throw new Error(`Error en el servidor: Status ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Error en InversionService.obtenerPorUsuario:", error);
      throw error; 
    }
  },

  obtenerTotal: async (idUsuario: number): Promise<number> => {
    try {
      
      const response = await fetch(`${API_URL}/usuario/${idUsuario}/total`);
      if (!response.ok) throw new Error(`Error en el servidor: Status ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Error en InversionService.obtenerTotal:", error);
      return 0;
    }
  },

  crearInversion: async (nuevaInversion: Inversion): Promise<Inversion | null> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaInversion),
      });
      if (!response.ok) throw new Error(`Error en la persistencia: Status ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Error en InversionService.crearInversion:", error);
      return null;
    }
  }
};