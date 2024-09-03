import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const AddRol: React.FC = () => {
  const [descripcionRol, setDescripcionRol] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!descripcionRol) {
      setError('Por favor, completa el campo de descripción.');
      return;
    }
    try {
      await api.post('/roles', {
        descripcion: descripcionRol,
      });
      navigate('/Roles');
    } catch (error: any) {
      console.error('Error al agregar el rol:', error);
      setError('Error al agregar el rol: ' + error.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-md w-full max-w-md tw-mx-auto">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Agregar Rol</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="descripcion" className="tw-block tw-text-gray-700 tw-font-semibold">Descripción del Rol</label>
            <input
              type="text"
              id="descripcion"
              value={descripcionRol}
              onChange={(e) => setDescripcionRol(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="Descripción del rol"
              required
            />
          </div>
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:bg-blue-600 tw-transition"
          >
            Agregar Rol
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRol;