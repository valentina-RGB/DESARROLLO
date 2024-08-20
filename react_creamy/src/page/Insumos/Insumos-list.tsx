import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Insumo } from '../../types/insumos';



const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/insumos')
      .then(response => {
       
        setInsumos(response.data);
      })
      .catch(error => console.error('Error al obtener los insumos:', error));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/Insumos/Edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/insumos/${id}`);
      
      setInsumos(insumos.filter(insumo => insumo.ID_insumo !== id));
    } catch (error) {
      console.error('Error al eliminar el insumo:', error);
    }
  };

  const handleAddEntries = () => {
    navigate('/Insumos/AddEntry'); 
  };

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h2 className="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-gray-800">Lista de Insumos</h2>
      <div className="tw-flex tw-space-x-4 tw-mb-6">
        <button 
          onClick={() => navigate('/Insumos/Add')} 
          className="tw-bg-teal-500 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-shadow-md tw-hover:bg-teal-600 tw-transition tw-font-semibold"
        >
          Agregar Insumo
        </button>
        <button 
          onClick={handleAddEntries} 
          className="tw-bg-blue-500 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-shadow-md tw-hover:bg-blue-600 tw-transition tw-font-semibold"
        >
          Agregar Entradas
        </button>
      </div>
      <div className="tw-mt-6 tw-overflow-x-auto">
        <table className="tw-w-full tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-lg">
          <thead className="tw-bg-teal-100 tw-border-b tw-border-gray-200">
            <tr>
              <th className="tw-py-4 tw-px-6 tw-text-left tw-text-sm tw-font-semibold tw-text-teal-600">Nombre</th>
              <th className="tw-py-4 tw-px-6 tw-text-left tw-text-sm tw-font-semibold tw-text-teal-600">Precio</th>
              <th className="tw-py-4 tw-px-6 tw-text-left tw-text-sm tw-font-semibold tw-text-teal-600">Estado</th>
              <th className="tw-py-4 tw-px-6 tw-text-left tw-text-sm tw-font-semibold tw-text-teal-600">Cantidad</th>
              <th className="tw-py-4 tw-px-6 tw-text-left tw-text-sm tw-font-semibold tw-text-teal-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map(insumo => (
              <tr key={insumo.ID_insumo} className="tw-transition-colors tw-duration-300 tw-ease-in-out hover:tw-bg-teal-50">
                <td className="tw-py-4 tw-px-6 tw-text-sm tw-text-gray-800">{insumo.descripcion_insumo}</td>
                <td className="tw-py-4 tw-px-6 tw-text-sm tw-text-gray-800">${insumo.precio.toFixed(2)}</td>
                <td className="tw-py-4 tw-px-6 tw-text-sm">
                  <span className={`tw-inline-block tw-px-4 tw-py-1 tw-text-xs tw-font-semibold tw-rounded-full ${insumo.estado_insumo === 'A' ? 'tw-bg-green-100 tw-text-green-800' : 'tw-bg-red-100 tw-text-red-800'}`}>
                    {insumo.estado_insumo === 'A' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="tw-py-4 tw-px-6 tw-text-sm tw-text-gray-800">
  {insumo.stock?.stock_actual ?? 'N/A'}
</td>
                <td className="tw-py-4 tw-px-6 tw-text-sm tw-flex tw-space-x-2 tw-justify-center">
                  <button 
                    onClick={() => handleEdit(insumo.ID_insumo)} 
                    className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md tw-hover:bg-blue-600 tw-transition tw-font-semibold"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(insumo.ID_insumo)} 
                    className="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-shadow-md tw-hover:bg-red-600 tw-transition tw-font-semibold"
                  >
                    Eliminar
                  </button>
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
