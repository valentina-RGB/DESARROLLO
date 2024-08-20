import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

interface Usuario {
  ID_usuario: number;
  email: string;
  telefono: string;
  ID_rol: number;
  estado: string;
}

const ListarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
        setError('Error al cargar los usuarios.');
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
      <div className="tw-max-w-4xl tw-mx-auto">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Lista de Usuarios</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <Link to="/agregar-usuario" className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:bg-blue-600 tw-transition tw-mb-4 tw-inline-block">
          Agregar Nuevo Usuario
        </Link>
        <table className="tw-min-w-full tw-bg-white tw-shadow-md tw-rounded-lg tw-overflow-hidden">
          <thead className="tw-bg-gray-200 tw-text-gray-700">
            <tr>
              <th className="tw-py-3 tw-px-4 tw-text-left">ID</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">Email</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">Teléfono</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">ID Rol</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">Estado</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.ID_usuario} className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-100">
                <td className="tw-py-3 tw-px-4">{usuario.ID_usuario}</td>
                <td className="tw-py-3 tw-px-4">{usuario.email}</td>
                <td className="tw-py-3 tw-px-4">{usuario.telefono}</td>
                <td className="tw-py-3 tw-px-4">{usuario.ID_rol}</td>
                <td className="tw-py-3 tw-px-4">{usuario.estado}</td>
                <td className="tw-py-3 tw-px-4">
                  <Link to={`/editar-usuario/${usuario.ID_usuario}`} className="tw-text-blue-500 tw-hover:text-blue-700 tw-mr-2">Editar</Link>
                  <button onClick={() => {/* Implementar lógica de eliminación */}} className="tw-text-red-500 tw-hover:text-red-700">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarUsuarios;
