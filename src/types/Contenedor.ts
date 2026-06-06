export interface Contenedor {
  idContenedor: string;
  nombreModelo: string;
  presupuestoAsignado: number;
  descripcion?: string;
  progreso?: number;
  nombreSupervisor?: string;
  fechaLimite?: string;
  imagenDisenoUrl?: string;
}