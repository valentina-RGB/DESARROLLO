import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Usuario } from '../../types/usuarios';
import { toast } from 'react-hot-toast';  

interface AddEntryProps {
  id: number;  
  onClose: () => void;  
}

const AddEntry: React.FC<AddEntryProps> = ({ id, onClose }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [Nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');/* 
  const [contrasena, setContrasena] = useState<string>(''); */
  const [telefono, setTelefono] = useState<number>(100);
  const [ID_rol, setID_rol] = useState<string>('');
  const [estado, setEstado] = useState<string>('A');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/usuarios/${id}`, { Nombre, email, /* contrasena, */ telefono, ID_rol });
      onClose(); 
      toast.success('El dato del usuario se ha agregado exitosamente.');
      navigate('/Usuarios'); 
    } catch (error) {
      console.error('Error al agregar el dato:', error);
      toast.error('No se pudo agregar el dato del usuario. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="tw-bg-white tw-p-6 tw-rounded-xl tw-shadow-lg tw-max-w-lg w-full">
        <h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-gray-800">Agregar dato</h2>
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <label htmlFor="nombre" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={Nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="email" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Email</label>
            <textarea
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="telefono" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">telefono</label>
            <textarea
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(Number(e.target.value))}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
            <div className="tw-mb-4">
            <label htmlFor="rol" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">rol</label>
            <textarea
              id="rol"
              value={ID_rol}
              onChange={(e) => setID_rol(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
          </div>
          <div className="tw-mb-4">
            <label htmlFor="estado_rol" className="tw-block tw-text-sm tw-font-medium tw-text-gray-600">Estado</label>
            <textarea
              id="estado_rol"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 tw-transition"
              rows={3}
            />
          </div>
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
