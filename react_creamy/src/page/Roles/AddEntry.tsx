import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Rol } from '../../types/roles';
import { toast } from 'react-hot-toast';  

interface AddEntryProps {
  id: number;  
  onClose: () => void;  
}

const AddEntry: React.FC<AddEntryProps> = ({ id, onClose }) => {
  const [rol, setRol] = useState<Rol | null>(null);
  const [descripcion, setDescripcion] = useState<string>('');
  const [estado_rol, setEstado_Rol] = useState<string>('A');
  const [permisos, setPermisos] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRol = async () => {
      try {
        const response = await api.get(`/roles/${id}`);
        setRol(response.data);
      } catch (error) {
        console.error('Error al obtener el rol:', error);
      }
    };

    fetchRol();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/roles/${id}`, { descripcion, estado_rol, permisos });
      onClose(); 
      toast.success('El dato del rol se ha agregado exitosamente.');
      navigate('/Roles'); 
    } catch (error) {
      console.error('Error al agregar el dato:', error);
      toast.error('No se pudo agregar el dato del rol. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-lg tw-max-w-lg w-full">
        <h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-gray-800">Agregar Dato</h2>
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="descripcion" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="estado_rol" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Estado</label>
            <textarea
              id="estado_rol"
              value={estado_rol}
              onChange={(e) => setEstado_Rol(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="permisos" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Permisos</label>
            <textarea
              id="permisos"
              value={permisos}
              onChange={(e) => setPermisos(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
          </div>
          <div className="tw-flex tw-justify-end">
            <button
              type="button"
              onClick={onClose}
              className="tw-mr-4 tw-px-4 tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-300 tw-transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="tw-bg-green-500 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg hover:tw-bg-green-600 tw-transition tw-font-semibold"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntry;
