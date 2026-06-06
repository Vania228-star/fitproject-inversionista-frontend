'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ContenedorService, IndicadoresService } from "./services/ContenedorService";
import { Contenedor } from "@/types/Contenedor";

export default function InversionistaPage() {
  const [contenedores, setContenedores] = useState<Contenedor[]>([]);
  const [indicadores, setIndicadores] = useState({ totalInvertido: 0, progresoGlobal: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  const usuarioActivo = {
    nombre: "Carlos Mendoza",
    email: "carlos@fitproject.cl",
    role: "INVERSIONISTA"
  };

  const estadisticas = useMemo(() => {
    const totalPresupuesto = contenedores.reduce((acc, c) => acc + (c.presupuestoAsignado || 0), 0);
    return { totalPresupuesto };
  }, [contenedores]);

  const cargarDatosPanel = useCallback(async () => {
    setLoading(true);
    try {
      const [indicadoresData, listaContenedores] = await Promise.all([
        IndicadoresService.obtenerIndicadores(),
        ContenedorService.obtenerTodos()
      ]);
      
      setIndicadores(indicadoresData);
      setContenedores(listaContenedores);
    } catch (err) {
      console.error("Error al cargar datos:", err);
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
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bienvenido, {usuarioActivo.nombre}</h1>
        <p className="text-sm text-gray-600">Perfil: {usuarioActivo.role}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Total Invertido</p>
          <p className="text-2xl font-black text-gray-900 mt-1">${indicadores.totalInvertido.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Presupuesto en Obras</p>
          <p className="text-2xl font-black text-blue-900 mt-1">${estadisticas.totalPresupuesto.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase">Progreso Global Portafolio</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{indicadores.progresoGlobal.toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Estado de Unidades Modulares</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contenedores.map(c => (
            <div key={c.idContenedor} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-bold text-gray-700">📦 Contenedor: {c.nombreModelo}</p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${c.progreso || 0}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}