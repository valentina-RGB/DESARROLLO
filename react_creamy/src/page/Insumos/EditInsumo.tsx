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
        <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen">
            <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Editar Insumo</h2>
            <form onSubmit={handleSubmit} className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-md">
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-gray-700">Descripción del Insumo</label>
                    <input
                        type="text"
                        value={descripcionInsumo}
                        onChange={(e) => setDescripcionInsumo(e.target.value)}
                        className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm"/>
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-gray-700">Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                        className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md shadow-sm"
                    />
                </div>
                <div className="tw-mb-4">
                    <label className="tw-block tw-text-gray-700">Estado</label>
                    <select
                        value={estadoInsumo}
                        onChange={(e) => setEstadoInsumo(e.target.value)}
                        className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm"
                    >
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-hover:bg-blue-600 tw-transition">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditInsumo;