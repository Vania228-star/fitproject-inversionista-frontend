import { Evidencia } from "@/types/Evidencia";

const API_BASE_URL = "http://localhost:8080/api/v1/evidencias";

export const EvidenciaService = {
  obtenerPorContenedor: async (idContenedor: string): Promise<Evidencia[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contenedor/${idContenedor}`);
      if (!response.ok) throw new Error("No se pudieron recuperar las evidencias técnicas.");
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Error en EvidenciaService.obtenerPorContenedor:", error);
      return [];
    }
  },

  subirEvidencia: async (idContenedor: string, descripcion: string, archivo: File): Promise<Evidencia | null> => {
    try {
      const formData = new FormData();
      formData.append("idContenedor", idContenedor);
      formData.append("descripcion", descripcion);
      formData.append("file", archivo);

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Fallo en la persistencia de evidencia: Status ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("[QA_ERROR] Error en EvidenciaService.subirEvidencia:", error);
      return null;
    }
  }
};