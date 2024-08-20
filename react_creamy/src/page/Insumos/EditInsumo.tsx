import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const EditInsumo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [descripcionInsumo, setDescripcionInsumo] = useState('');
    const [precio, setPrecio] = useState(0);
    const [estadoInsumo, setEstadoInsumo] = useState('A');
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/insumos/${id}`)
            .then(response => {
                const { descripcion_insumo, precio, estado_insumo } = response.data;
                setDescripcionInsumo(descripcion_insumo);
                setPrecio(precio);
                setEstadoInsumo(estado_insumo);
            })
            .catch(error => console.error('Error al obtener el insumo:', error));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/insumos/${id}`, { descripcion_insumo: descripcionInsumo, precio, estado_insumo: estadoInsumo });
            navigate('/Insumos');
        } catch (error) {
            console.error('Error al editar el insumo:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Editar Insumo</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del Insumo</label>
                    <input
                        type="text"
                        value={descripcionInsumo}
                        onChange={(e) => setDescripcionInsumo(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Estado</label>
                    <select
                        value={estadoInsumo}
                        onChange={(e) => setEstadoInsumo(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditInsumo;