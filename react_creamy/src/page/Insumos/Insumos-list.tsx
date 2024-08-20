import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Insumo } from '../../types/insumos';



const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);

  useEffect(() => {
    api.get('/insumos')
      .then(response => setInsumos(response.data))
      .catch(error => console.error('Error al obtener los insumos:', error));
  }, []);

  const handleEdit = (id: number) => {
    // Implementar lógica para editar el insumo
    console.log('Editar insumo con ID:', id);
  };

  const handleDelete = (id: number) => {
    // Implementar lógica para eliminar el insumo
    console.log('Eliminar insumo con ID:', id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Lista de Insumos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Nombre</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Precio</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Estado</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Cantidad</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map(insumo => (
              <tr key={insumo.ID_insumo} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-800">{insumo.descripcion_insumo}</td>
                <td className="py-4 px-6 text-sm text-gray-800">${insumo.precio.toFixed(2)}</td>
                <td className="py-4 px-6 text-sm">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${insumo.estado_insumo === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {insumo.estado_insumo === 'A' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">{insumo.cantidad}</td>
                <td className="py-4 px-6 text-sm flex space-x-2 justify-center">
                  <button onClick={() => handleEdit(insumo.ID_insumo)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">Editar</button>
                  <button onClick={() => handleDelete(insumo.ID_insumo)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsumosList;