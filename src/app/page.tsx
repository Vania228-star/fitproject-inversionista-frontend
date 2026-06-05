'use client';
import { useState, useEffect, useCallback } from 'react';
import { InversionService } from "./services/InversionService";
import { ContenedorService } from "./services/ContenedorService";
import { Inversion } from "@/types/Inversion";
import { Contenedor } from "@/types/Contenedor";

export default function InversionistaPage() {
  const [total, setTotal] = useState<number>(0);
  const [movimientos, setMovimientos] = useState<Inversion[]>([]);
  const [contenedores, setContenedores] = useState<Contenedor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const usuarioActivo = {
    nombre: "Carlos Mendoza",
    email: "carlos@fitproject.cl",
    role: "INVERSIONISTA"
  };

  const cargarDatosPanel = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [montoTotal, listaMovimientos, listaContenedores] = await Promise.all([
        InversionService.obtenerTotal(1), 
        InversionService.obtenerPorUsuario(1),
        ContenedorService.obtenerTodos()
      ]);

      setTotal(montoTotal);
      setMovimientos(listaMovimientos);
      setContenedores(listaContenedores);
    } catch (err) {
      setError("Inconsistencia en la conexión de red. No se pudo comunicar con la API de FitProject.");
      console.error("[UI_ERROR] Falló el renderizado dinámico del panel:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatosPanel();
  }, [cargarDatosPanel]);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Bienvenido, {usuarioActivo.nombre}
          </h1>
          <p className="text-sm text-gray-600 mt-1">Perfil: {usuarioActivo.role} ({usuarioActivo.email})</p>
        </div>
      </header>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Estado de Unidades Modulares Asociadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contenedores.map(c => (
            <div key={c.idContenedor} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-bold text-gray-700">📦 Contenedor: {c.nombre}</p>
              <p className="text-sm text-gray-500">Presupuesto Asignado: ${c.presupuesto.toLocaleString('es-CL')}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${c.progresoFisico}%` }}></div>
              </div>
              <p className="text-right text-xs font-semibold text-blue-600 mt-1">{c.progresoFisico}% Completado</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}