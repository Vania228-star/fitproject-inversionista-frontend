import { Inversion } from "@/types/Inversion";

const API_URL = "http://localhost:8080/api/inversiones";

export const InversionService = {
  
  obtenerPorUsuario: async (idUsuario: number): Promise<Inversion[]> => {
    try {
      const response = await fetch(`${API_URL}/usuario/${idUsuario}`);
      if (!response.ok) throw new Error("Error al obtener inversiones");
      return await response.json();
    } catch (error) {
      console.error("Error en service obtenerPorUsuario:", error);
      return [];
    }
  },

  obtenerTotal: async (idUsuario: number): Promise<number> => {
    try {
      const response = await fetch(`${API_URL}/total/${idUsuario}`);
      if (!response.ok) throw new Error("Error al obtener el total");
      return await response.json();
    } catch (error) {
      console.error("Error en service obtenerTotal:", error);
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
      if (!response.ok) throw new Error("Error al crear inversión");
      return await response.json();
    } catch (error) {
      console.error("Error en service crearInversion:", error);
      return null;
    }
  },

  verificarStatus: async (): Promise<string> => {
    const response = await fetch(`${API_URL}/status`);
    return await response.text();
  }
};