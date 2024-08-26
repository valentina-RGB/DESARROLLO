import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Insumo } from '../../types/insumos';
import Swal from 'sweetalert2';  // Importa SweetAlert2

// Definimos la interfaz para las props que recibirá AddEntry
interface AddEntryProps {
  id: number;  // ID del insumo seleccionado
  onClose: () => void;  // Función para cerrar la modal
}

const AddEntry: React.FC<AddEntryProps> = ({ id, onClose }) => {
  const [insumo, setInsumo] = useState<Insumo | null>(null);
  const [cantidad, setCantidad] = useState<number>(0);
  const [descripcion, setDescripcion] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsumo = async () => {
      try {
        const response = await api.get(`/insumos/${id}`);
        setInsumo(response.data);
      } catch (error) {
        console.error('Error al obtener el insumo:', error);
      }
    };

    fetchInsumo();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/insumos/${id}/entradas`, { cantidad, descripcion });
      onClose();  // Cierra la modal después de agregar la entrada
      Swal.fire({
        icon: 'success',
        title: 'Entrada agregada',
        text: 'La entrada del insumo se ha agregado exitosamente.',
      }).then(() => {
        navigate('/Insumos');  // Navega de regreso a la lista de insumos después de cerrar la alerta
      });
    } catch (error) {
      console.error('Error al agregar la entrada:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar la entrada del insumo. Por favor, intente nuevamente.',
      });
    }
  };

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h2 className="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-gray-800">Agregar Entrada de Insumo</h2>
      <form onSubmit={handleSubmit} className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-md">
        <div className="tw-mb-4">
          <label htmlFor="cantidad" className="tw-block tw-text-gray-700">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm"
          />
        </div>
        <div className="tw-mb-4">
          <label htmlFor="descripcion" className="tw-block tw-text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
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
