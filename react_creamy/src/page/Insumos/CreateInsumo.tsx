import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface CreateInsumoProps {
  onClose: () => void;
}

const CreateInsumo: React.FC<CreateInsumoProps> = ({ onClose }) => {
  const [descripcionInsumo, setDescripcionInsumo] = useState('');
  const [precio, setPrecio] = useState<number | string>('');

  const [tipoInsumo, setTipoInsumo] = useState<number | string>('');
  const [tiposInsumo, setTiposInsumo] = useState<Array<{ ID_tipo_insumo: number, descripcion_tipo: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiposInsumo = async () => {
      try {
        const response = await api.get('/tipoInsumos');
        setTiposInsumo(response.data);
      } catch (error) {
        console.error('Error fetching types of insumos:', error);
        setError('Error al cargar los tipos de insumos.');
      }
    };

    fetchTiposInsumo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descripcionInsumo || !precio || !tipoInsumo) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    try {
      await api.post('/insumos', {
        descripcion_insumo: descripcionInsumo,
        precio: Number(precio),
        
        ID_tipo_insumo: Number(tipoInsumo),
      });
      await Swal.fire('¡Éxito!', 'Insumo agregado correctamente.', 'success');
      onClose(); // Cierra el modal y actualiza la lista
    } catch (error: any) {
      console.error('Error al agregar el insumo:', error);
      setError('Error al agregar el insumo: ' + (error.response?.data?.message || 'Error desconocido'));
      await Swal.fire('Error', 'Hubo un problema al agregar el insumo.', 'error');
    }
  };

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen flex items-center justify-center">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-md w-full max-w-md">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Agregar Insumo</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="descripcion" className="tw-block tw-text-gray-700 tw-font-semibold">Descripción del Insumo</label>
            <input
              id="descripcion"
              type="text"
              value={descripcionInsumo}
              onChange={(e) => setDescripcionInsumo(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="Descripción del insumo"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="precio" className="tw-block tw-text-gray-700 tw-font-semibold">Precio</label>
            <input
              id="precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="Precio del insumo"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="tipoInsumo" className="tw-block tw-text-gray-700 tw-font-semibold">Tipo de Insumo</label>
            <select
              id="tipoInsumo"
              value={tipoInsumo}
              onChange={(e) => setTipoInsumo(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
            >
              <option value="" disabled>Selecciona un tipo de insumo</option>
              {tiposInsumo.map(tipo => (
                <option key={tipo.ID_tipo_insumo} value={tipo.ID_tipo_insumo}>{tipo.descripcion_tipo}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-shadow-md tw-hover:bg-blue-600 tw-transition tw-font-semibold"
          >
            Agregar Insumo
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInsumo;
