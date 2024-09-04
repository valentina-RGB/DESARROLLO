import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { DetalleVenta } from '../../types/Ventas';
import { toast } from 'react-hot-toast';

const VentaDetails: React.FC<{ id: number; onClose: () => void }> = ({ id, onClose }) => {
  const [venta, setVenta] = useState<DetalleVenta | null>(null);

  useEffect(() => {
    const fetchVentaDetails = async () => {
      try {
        const response = await api.get<DetalleVenta>(`/ventas/${id}`);
        setVenta(response.data);
      } catch (error) {
        toast.error('Error al obtener los detalles de la venta');
      }
    };

    fetchVentaDetails();
  }, [id]);

  if (!venta) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <strong>Cliente:</strong> {venta.cliente?.nombre || 'N/A'}
      </div>
      <div>
        <strong>Productos:</strong>
        <ul>
          {venta.productos?.length > 0 ? (
            venta.productos.map((producto) => (
              <li key={producto.ID_producto}>
                {producto.nombre} - {producto.cantidad} unidades
              </li>
            ))
          ) : (
            <li>No hay productos asociados a esta venta</li>
          )}
        </ul>
      </div>
      <div>
        <strong>Estado de Venta:</strong> {venta.estado_venta?.nombre || 'N/A'}
      </div>
    </div>
  );
};

export default VentaDetails;
