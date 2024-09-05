import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface CreateRolProps {
  onClose: () => void;
}

const AddRol: React.FC<CreateRolProps> = ({ onClose }) => {
  const [descripcionRol, setDescripcionRol] = useState('');
  const [selectedPermiso, setSelectedPermiso] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const permisoRol = [
    { ID_permiso: 1, descripcion_tipo: 'Leer' },
    { ID_permiso: 2, descripcion_tipo: 'Crear' },
    { ID_permiso: 3, descripcion_tipo: 'Editar' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descripcionRol || !selectedPermiso) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    try {
      await api.post('/roles', {
        descripcion: descripcionRol,
        ID_permiso: Number(selectedPermiso),
      });
      toast.success('Rol agregado correctamente.');
      onClose(); // Cierra el modal y actualiza la lista
    } catch (error: any) {
      console.error('Error al agregar el rol:', error);
      setError('Error al agregar el rol: ' + (error.response?.data?.message || 'Error desconocido'));
      toast.error('Hubo un problema al agregar el rol.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-lg tw-max-w-lg w-full">
        <h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-gray-800">Agregar Rol</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="descripcion" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Descripción del Rol</label>
            <input
              id="descripcion"
              type="text"
              value={descripcionRol}
              onChange={(e) => setDescripcionRol(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              placeholder="Descripción del rol"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="Permiso" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Tipo de Permiso</label>
            <select
              id="Permiso"
              value={selectedPermiso}
              onChange={(e) => setSelectedPermiso(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition"
              required
            >
              <option value="" disabled>Selecciona un tipo de permiso</option>
              {permisoRol.map(permiso => (
                <option key={permiso.ID_permiso} value={permiso.ID_permiso}>
                  {permiso.descripcion_tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="tw-flex tw-justify-end">
            <button
              type="submit"
              className="tw-mr-4 tw-px-4 tw-py-2 tw-bg-green-500 tw-text-white tw-rounded-lg hover:tw-bg-green-600 tw-transition"
            >
              Agregar Rol
            </button>
            <button
              type="button"
              onClick={onClose}
              className="tw-px-4 tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-300 tw-transition"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRol;