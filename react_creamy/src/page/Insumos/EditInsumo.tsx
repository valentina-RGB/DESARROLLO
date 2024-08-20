import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const EditInsumo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [descripcionInsumo, setDescripcionInsumo] = useState('');
    const [precio, setPrecio] = useState<number | string>('');
    const [estadoInsumo, setEstadoInsumo] = useState('A');
    const [tipoInsumo, setTipoInsumo] = useState<number | string>('');
    const [tiposInsumo, setTiposInsumo] = useState<Array<{ ID_tipo_insumo: number, descripcion_tipo: string }>>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar los tipos de insumo
        const fetchTiposInsumo = async () => {
            try {
                const response = await api.get('/tipoInsumos');
                setTiposInsumo(response.data);
            } catch (error) {
                console.error('Error fetching types of insumos:', error);
                setError('Error al cargar los tipos de insumos.');
            }
        };

        fetchTiposInsumo();

        // Cargar los detalles del insumo a editar
        api.get(`/insumos/${id}`)
            .then(response => {
                const { descripcion_insumo, precio, estado_insumo, ID_tipo_insumo } = response.data;
                setDescripcionInsumo(descripcion_insumo);
                setPrecio(precio);
                setEstadoInsumo(estado_insumo);
                setTipoInsumo(ID_tipo_insumo);
            })
            .catch(error => {
                console.error('Error al obtener el insumo:', error);
                setError('Error al obtener el insumo.');
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!descripcionInsumo || !precio || !estadoInsumo || !tipoInsumo) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Validar el estado del insumo
        const estadoFinal = estadoInsumo === 'A' ? 'A' : 'D';

        try {
            await api.put(`/insumos/${id}`, {
                descripcion_insumo: descripcionInsumo,
                precio: Number(precio),
                estado_insumo: estadoFinal,
                ID_tipo_insumo: Number(tipoInsumo),
            });
            navigate('/Insumos');
        } catch (error: any) {
            console.error('Error al editar el insumo:', error);
            if (error.response?.status === 404) {
                setError('Insumo no encontrado.');
            } else {
                setError('Error al editar el insumo: ' + error.response?.data?.message || 'Error desconocido');
            }
        }
    };

    return (
        <div className="tw-p-6 tw-bg-gray-50 tw-min-h-screen flex items-center justify-center">
            <div className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-md w-full max-w-md">
                <h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-gray-900">Editar Insumo</h2>
                {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="tw-mb-4">
                        <label htmlFor="descripcion" className="tw-block tw-text-gray-700 tw-font-semibold">Descripción del Insumo</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={descripcionInsumo}
                            onChange={(e) => setDescripcionInsumo(e.target.value)}
                            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
                            placeholder="Descripción del insumo"
                            required
                        />
                    </div>
                    <div className="tw-mb-4">
                        <label htmlFor="precio" className="tw-block tw-text-gray-700 tw-font-semibold">Precio</label>
                        <input
                            type="number"
                            id="precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
                            placeholder="Precio del insumo"
                            required
                        />
                    </div>
                    <div className="tw-mb-4">
                        <label htmlFor="estado" className="tw-block tw-text-gray-700 tw-font-semibold">Estado</label>
                        <select
                            id="estado"
                            value={estadoInsumo}
                            onChange={(e) => setEstadoInsumo(e.target.value)}
                            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
                        >
                            <option value="A">Activo</option>
                            <option value="D">Inactivo</option>
                        </select>
                    </div>
                    <div className="tw-mb-4">
                        <label htmlFor="tipoInsumo" className="tw-block tw-text-gray-700 tw-font-semibold">Tipo de Insumo</label>
                        <select
                            id="tipoInsumo"
                            value={tipoInsumo}
                            onChange={(e) => setTipoInsumo(e.target.value)}
                            className="tw-mt-1 tw-block tw-w-full tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:ring-indigo-500 tw-focus:border-indigo-500"
                        >
                            <option value="" disabled>Selecciona un tipo de insumo</option>
                            {tiposInsumo.map(tipo => (
                                <option key={tipo.ID_tipo_insumo} value={tipo.ID_tipo_insumo}>{tipo.descripcion_tipo}</option>
                            ))}
                        </select>
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

export default EditInsumo;
