import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';


interface Rol {
  ID_rol: number;
  descripcion: string;
  estado: string;
}

const EditarRol: React.FC = () => {
  const [rol, setRol] = useState<Rol | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRol = async () => {
      try {
        const response = await api.get(`/roles/${id}`);
        setRol(response.data);
      } catch (error) {
        console.error('Error fetching rol:', error);
        setError('Error al cargar los datos del rol.');
      } finally {
        setLoading(false);
      }
    };

    fetchRol();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRol((prevRol) => prevRol ? { ...prevRol, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rol) return;

    try {
      await api.put(`/roles/${rol.ID_rol}`, rol);
      navigate('/roles');
    } catch (error: any) {
      console.error('Error al actualizar el rol:', error);
      setError('Error al actualizar el rol: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="tw-text-red-500">{error}</div>;
  if (!rol) return <div>Rol no encontrado</div>;

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-md w-full max-w-md tw-mx-auto">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Editar Rol</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="descripcion" className="tw-block tw-text-gray-700 tw-font-semibold">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={rol.descripcion}
              onChange={handleInputChange}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="estado" className="tw-block tw-text-gray-700 tw-font-semibold">Estado</label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={rol.estado}
              onChange={handleInputChange}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:bg-blue-600 tw-transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarRol;
