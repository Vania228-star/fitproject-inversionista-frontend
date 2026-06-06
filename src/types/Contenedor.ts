export interface Contenedor {
  idContenedor: string;
  nombreModelo: string;
  presupuestoAsignado: number;
  descripcion?: string;
  progresoFisico?: number;
  nombreSupervisor?: string;
  fechaLimite?: string;
  imagenDisenoUrl?: string;
}