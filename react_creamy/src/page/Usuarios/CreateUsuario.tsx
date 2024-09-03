import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const AddUsuario: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ID_rol, setIDRol] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !telefono || !ID_rol) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      await api.post('/usuarios', {
        email,
        password,
        telefono,
        ID_rol,
        estado: 'A', 
      });
      navigate('/Usuarios');
    } catch (error: any) {
      console.error('Error al agregar el usuario:', error);
      setError('Error al agregar el usuario: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  return (
    <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
      <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-md w-full max-w-md tw-mx-auto">
        <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Agregar Usuario</h2>
        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="email" className="tw-block tw-text-gray-700 tw-font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="password" className="tw-block tw-text-gray-700 tw-font-semibold">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="telefono" className="tw-block tw-text-gray-700 tw-font-semibold">Teléfono</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="Teléfono"
              required
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="ID_rol" className="tw-block tw-text-gray-700 tw-font-semibold">ID Rol</label>
            <input
              type="text"
              id="ID_rol"
              value={ID_rol}
              onChange={(e) => setIDRol(e.target.value)}
              className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
              placeholder="ID del Rol"
              required
            />
          </div>
          <button
            type="submit"
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:bg-blue-600 tw-transition"
          >
            Agregar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUsuario;
