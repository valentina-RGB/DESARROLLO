import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import { Usuario } from '../../types/usuarios';


const EditarUsuario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        setUsuario(response.data);
        console.log(response);
        
      } catch (error) {
        console.error('Error fetching usuario:', error);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => prevUsuario ? { ...prevUsuario, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    try {
      await api.put(`/usuarios/${usuario.ID_usuario}`, usuario);
      navigate('/usuarios');
    } catch (error: any) {
      console.error('Error al actualizar el usuario:', error);
      setError('Error al actualizar el usuario: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="tw-text-red-500">{error}</div>;
  if (!usuario) return <div>Usuario no encontrado</div>;

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-md w-full max-w-md tw-mx-auto">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Editar Usuario</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="email" className="tw-block tw-text-gray-700 tw-font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleInputChange}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="password" className="tw-block tw-text-gray-700 tw-font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={usuario.password}
              onChange={handleInputChange}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="telefono" className="tw-block tw-text-gray-700 tw-font-semibold">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={usuario.telefono}
              onChange={handleInputChange}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="ID_rol" className="tw-block tw-text-gray-700 tw-font-semibold">ID Rol</label>
            <input
              type="number"
              id="ID_rol"
              name="ID_rol"
              value={usuario.ID_rol}
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
              value={usuario.estado}
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

export default EditarUsuario;
