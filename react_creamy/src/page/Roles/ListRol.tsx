import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { Rol } from '../../types/roles';

const ListarRoles: React.FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        console.log(response);

        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setError('Error al cargar los roles.');
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
      <div className="tw-max-w-4xl tw-mx-auto">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Lista de Roles</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <Link to="/agregar-rol" className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:bg-blue-600 tw-transition tw-mb-4 tw-inline-block">
          Agregar Nuevo Rol
        </Link>
        <table className="tw-min-w-full tw-bg-white tw-shadow-md tw-rounded-lg tw-overflow-hidden">
          <thead className="tw-bg-gray-200 tw-text-gray-700">
            <tr>
              <th className="tw-py-3 tw-px-4 tw-text-left">ID</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">Descripción</th>
              <th className="tw-py-3 tw-px-4 tw-text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.ID_rol} className="tw-border-b tw-border-gray-200 hover:tw-bg-gray-100">
                <td className="tw-py-3 tw-px-4">{rol.ID_rol}</td>
                <td className="tw-py-3 tw-px-4">{rol.descripcion}</td>
                <td className="tw-py-3 tw-px-4">
                  <Link to={`/editar-rol/${rol.id_rol}`} className="tw-text-blue-500 tw-hover:text-blue-700 tw-mr-2">Editar</Link>
                  <button onClick={async () => {
                    try {
                      await api.delete(`/roles/${rol.ID_rol}`);
                      setRoles(roles.filter(rol => rol.ID_rol !== rol.ID_rol));
                    } catch (error) {
                      console.error('Error al eliminar el rol:', error);
                    }
                  }} className="tw-text-red-500 tw-hover:text-red-700">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarRoles;