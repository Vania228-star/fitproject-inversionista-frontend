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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Cargando datos del ecosistema modular...</p>
      </div>
    );
  }

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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Invertido</p>
        <p className="text-2xl font-black text-gray-900 mt-1">${total?.toLocaleString('es-CL')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Estado de Unidades Modulares Asociadas</h3>
        
        {contenedores.length === 0 ? (
          <p className="text-gray-400 text-sm">No se encontraron unidades modulares activas asociadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contenedores.map(c => (
              <div key={c.idContenedor} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between">
                <div>
                  <p className="font-bold text-gray-700">📦 Contenedor: {c.nombreModelo}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Presupuesto Asignado: ${c.presupuestoAsignado?.toLocaleString('es-CL') || '0'}
                  </p>
                  
                  {c.descripcion && (
                    <p className="text-xs text-gray-400 mt-2 italic line-clamp-2">{c.descripcion}</p>
                  )}
                </div>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${c.progresoFisico || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs font-semibold text-blue-600 mt-1">
                    {c.progresoFisico || 0}% Completado
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}