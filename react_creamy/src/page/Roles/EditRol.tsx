import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Rol } from '../../types/roles';
import { toast } from 'react-hot-toast';

interface EditRolProps {
  id: number;
  onClose: () => void;
}

const EditRol: React.FC<EditRolProps> = ({ id, onClose }) => {
  const [rol, setRol] = useState<Rol | null>(null);
  const [descripcionRol, setDescripcionRol] = useState('');
  const [estado_rol, setEstadoRol] = useState<number | string>('');
  const [permiso, setPermiso] = useState<number | string>('');
  const [tiposPermiso, setTiposPermiso] = useState<Array<{ ID_tipo_Rol: number, descripcion_tipo: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const permisoRol = [
    { ID_permiso: 1, descripcion_tipo: 'Leer' },
    { ID_permiso: 2, descripcion_tipo: 'Crear' },
    { ID_permiso: 3, descripcion_tipo: 'Editar' }
  ];

  useEffect(() => {
    const fetchRol = async () => {
      try {
        const response = await api.get(`/roles/${id}`);
        setRol(response.data);
        setDescripcionRol(response.data.descripcion);
        setEstadoRol(response.data.estado_rol);
        setPermiso(response.data.ID_tipo_Rol);
      } catch (error) {
        console.error('Error al obtener el rol:', error);
        setError('Error al cargar el rol.');
      }
    };
  
    // const fetchTiposPermiso = async () => {
    //   try {
    //     const response = await api.get('/tipoPermiso');
    //     setTiposPermiso(response.data);
    //   } catch (error) {
    //     console.error('Error al obtener los tipos de permisos:', error);
    //     setError('Error al cargar los tipos de permisos.');
    //   }
    // };
  
    if (id) {
      fetchRol();
      // fetchTiposPermiso();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!descripcionRol || !permiso || !tiposPermiso) {
      setError('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      await api.put(`/roles/${id}`, {
        descripcion: descripcionRol,
        ID_permiso: Number(permiso)
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      toast.success('El rol se ha actualizado correctamente.');
      onClose();
      navigate('/roles');
    } catch (error: any) {
      console.error('Error al editar el rol:', error.response?.data || error.message);
      toast.error(`No se pudo actualizar el rol. Error: ${error.response?.data?.error || error.message}`);
    }
  };

  if (!rol) return <p>Cargando...</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg max-w-lg w-full">
        <h2 className="tw-text-2xl tw-font-semibold tw-mb-6 tw-text-gray-800">Editar Rol</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="descripcion" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Nombre del Rol</label>
            <input
              id="descripcion"
              type="text"
              value={descripcionRol}
              onChange={(e) => setDescripcionRol(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition"
              placeholder={descripcionRol}
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="tipoPermiso" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Permisos</label>
            <select
              id="tipoPermisos"
              value={permiso}
              onChange={(e) => setPermiso(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition"
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
              type="button"
              onClick={onClose}
              className="tw-mr-4 tw-px-4 tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-300 tw-transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="tw-mr-4 tw-px-4 tw-py-2 tw-bg-green-500 tw-text-white tw-rounded-lg hover:tw-bg-green-600 tw-transition"
            >
              Actualizar Rol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRol;
