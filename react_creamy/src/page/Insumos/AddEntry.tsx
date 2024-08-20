import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Insumo } from '../../types/insumos';

const AddEntry: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [selectedInsumo, setSelectedInsumo] = useState<number | undefined>(undefined);
  const [cantidad, setCantidad] = useState<number>(0);
  const [descripcion, setDescripcion] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/insumos')
      .then(response => setInsumos(response.data))
      .catch(error => console.error('Error al obtener los insumos:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
   
    if (selectedInsumo === undefined) {
      console.error('No se ha seleccionado un insumo.');
      return;
    }
    try { 
      await api.post(`/insumos/${selectedInsumo}/entradas`, { cantidad, descripcion });  
      navigate('/Insumos');
    } catch (error) {
      console.error('Error al agregar la entrada:', error);
    }
  };

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h2 className="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-gray-800">Agregar Entrada de Insumo</h2>
      <form onSubmit={handleSubmit} className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-md">
        <div className="tw-mb-4">
          <label className="tw-block tw-text-gray-700">Seleccionar Insumo</label>
          <select
            value={selectedInsumo}
            onChange={(e) => setSelectedInsumo(Number(e.target.value))}
            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm"
          >
            <option value="" disabled>Selecciona un insumo</option>
            {insumos.map(insumo => (
              <option key={insumo.ID_insumo} value={insumo.ID_insumo}>
                {insumo.descripcion_insumo}
              </option>
            ))}
          </select>
        </div>
        <div className="tw-mb-4">
          <label className="tw-block tw-text-gray-700">Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm"
          />
        </div>
        <div className="tw-mb-4">
          <label className="tw-block tw-text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="tw-bg-green-500 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-shadow-md tw-hover:bg-green-600 tw-transition tw-font-semibold"
        >
          Agregar Entrada
        </button>
      </form>
    </div>
  );
};

export default AddEntry;
