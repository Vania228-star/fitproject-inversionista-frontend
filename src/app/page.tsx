'use client';
import { useState, useEffect } from 'react';

export default function InversionistaPage() {
  const [total, setTotal] = useState(0);
  const idUsuario = 1; 

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Inversionista</h1>
          <p className="text-gray-600">Bienvenida de nuevo a Fit Project</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Invertido</p>
            <h2 className="text-3xl font-bold text-blue-600">
              ${total.toLocaleString('es-CL')}
            </h2>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-1">Proyectos Activos</p>
            <h2 className="text-3xl font-bold text-gray-800">1</h2>
          </div>

          <div className="flex items-center">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
              + Nueva Inversión
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Historial de Movimientos</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">ID Proyecto</th>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="px-6 py-4">#101 - Container Modular</td>
                <td className="px-6 py-4">13/05/2026</td>
                <td className="px-6 py-4 font-medium">$500.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
