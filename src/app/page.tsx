'use client';
import { useState, useEffect, useCallback } from 'react';
import { InversionService } from "./services/InversionService";
import { Inversion } from "@/types/Inversion";

export default function InversionistaPage() {
  const [total, setTotal] = useState<number>(0);
  const [movimientos, setMovimientos] = useState<Inversion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const idUsuario = 1;

  const cargarDatosPanel = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [montoTotal, listaMovimientos] = await Promise.all([
        InversionService.obtenerTotal(idUsuario),
        InversionService.obtenerPorUsuario(idUsuario)
      ]);

      setTotal(montoTotal);
      setMovimientos(listaMovimientos);
    } catch (err) {
      setError("Inconsistencia en la conexión de red. No se pudo comunicar con la API de FitProject.");
      console.error("[UI_ERROR] Falló el renderizado dinámico del panel:", err);
    } finally {
      setLoading(false);
    }
  }, [idUsuario]);

  useEffect(() => {
    cargarDatosPanel();
  }, [cargarDatosPanel]);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Panel de Inversionista</h1>
            <p className="text-sm text-gray-600 mt-1">Ecosistema Digital de Gestión Modular — Fit Project</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
            Sincronizado con v1 API
          </span>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-sm text-red-700">
            <p className="font-bold">Error detectado por el Plan de Pruebas:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Invertido</p>
            <h2 className="text-3xl font-black text-blue-600">
              {loading ? "Cargando..." : `$${total.toLocaleString('es-CL')}`}
            </h2>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Inversiones Activas</p>
            <h2 className="text-3xl font-black text-gray-800">
              {loading ? "..." : movimientos.length}
            </h2>
          </div>

          <div className="flex items-center">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-[0.99]">
              + Nueva Inversión
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Historial de Movimientos</h3>
            <button onClick={cargarDatosPanel} className="text-xs text-blue-600 hover:underline">
              🔄 Sincronizar en vivo
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold">ID Proyecto</th>
                  <th className="px-6 py-4 font-bold">Fecha de Registro</th>
                  <th className="px-6 py-4 font-bold text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-gray-400">
                      Consultando registros transaccionales en clúster...
                    </td>
                  </tr>
                ) : movimientos.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-gray-400">
                      No se registran movimientos de capital vigentes para este usuario.
                    </td>
                  </tr>
                ) : (
                  movimientos.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        📦 Unidad Modular Fit #{inv.idProyecto}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                      {inv.fechaInversion ? new Date(inv.fechaInversion.toString()).toLocaleDateString('es-CL', {
                       day: '2-digit', 
                       month: '2-digit', 
                       year: 'numeric', 
                       hour: '2-digit', 
                       minute: '2-digit'
                       }) : '—'}
                      </td>
                      <td className="px-6 py-4 font-bold text-right text-green-600">
                        ${inv.montoInvertido.toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}