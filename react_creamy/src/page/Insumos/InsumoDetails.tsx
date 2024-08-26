import React, { useEffect, useState } from 'react';
import api from '../../api/api';

interface InsumoDetailsProps {
  id: number;
  onClose: () => void;
}

interface Insumo {
  ID_insumo: number;
  descripcion_insumo: string;
  precio: number;
  estado_insumo: string;
  stock: {
    stock_actual: number;
    stock_min: number;
    stock_max: number;
  };
}

const InsumoDetails: React.FC<InsumoDetailsProps> = ({ id, onClose }) => {
  const [insumo, setInsumo] = useState<Insumo | null>(null);

  useEffect(() => {
    const fetchInsumoDetails = async () => {
      try {
        const response = await api.get(`/insumos/${id}/detalle`);
        setInsumo(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del insumo:', error);
      }
    };

    fetchInsumoDetails();
  }, [id]);

  if (!insumo) {
    return <div>Cargando detalles...</div>;
  }

  return (
    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-lg">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Detalles del Insumo</h2>
      <p><strong>Nombre:</strong> {insumo.descripcion_insumo}</p>
      <p><strong>Precio:</strong> ${insumo.precio.toFixed(2)}</p>
      <p><strong>Estado:</strong> {insumo.estado_insumo === 'A' ? 'Activo' : 'Inactivo'}</p>
      <p><strong>Stock Actual:</strong> {insumo.stock.stock_actual}</p>
      <p><strong>Stock Mínimo:</strong> {insumo.stock.stock_min}</p>
      <p><strong>Stock Máximo:</strong> {insumo.stock.stock_max}</p>
      <div className="tw-flex tw-justify-end tw-mt-4">
        <button
          onClick={onClose}
          className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default InsumoDetails;
