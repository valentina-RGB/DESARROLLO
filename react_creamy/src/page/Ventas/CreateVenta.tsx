import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { toast } from 'react-hot-toast';

interface Producto {
  ID_producto: number;
  nombre: string;
  precio: number;
}

interface Cliente {
  ID_cliente: number;
  nombre: string;
}

interface EstadoVenta {
  ID_estado_venta: number;
  descripcion: string;
}

interface CreateVentaProps {
  onClose: () => void;
}

const CreateVenta: React.FC<CreateVentaProps> = ({ onClose }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [estadoVentas, setEstadoVentas] = useState<EstadoVenta[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);
  const [selectedEstadoVenta, setSelectedEstadoVenta] = useState<number | null>(null);
  const [selectedProductos, setSelectedProductos] = useState<
    { ID_producto: number; cantidad: number; precio: number }[]
  >([]);
  const [precioTotal, setPrecioTotal] = useState<number>(0);

  useEffect(() => {
    fetchClientes();
    fetchProductos();
    fetchEstadoVentas();
  }, []);

  useEffect(() => {
    calculatePrecioTotal();
  }, [selectedProductos]);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      toast.error('Error al obtener los clientes');
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      toast.error('Error al obtener los productos');
    }
  };

  const fetchEstadoVentas = async () => {
    try {
      const response = await api.get('/estadoVentas');
      setEstadoVentas(response.data);
    } catch (error) {
      toast.error('Error al obtener los estados de venta');
    }
  };

  const handleAddProducto = () => {
    setSelectedProductos([
      ...selectedProductos,
      { ID_producto: 0, cantidad: 1, precio: 0 },
    ]);
  };

  const handleProductoChange = (index: number, field: string, value: number) => {
    const updatedProductos = selectedProductos.map((prod, i) =>
      i === index ? { ...prod, [field]: value } : prod,
    );
    setSelectedProductos(updatedProductos);
  };

  const calculatePrecioTotal = () => {
    const total = selectedProductos.reduce(
      (sum, prod) => sum + prod.cantidad * prod.precio,
      0,
    );
    setPrecioTotal(total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCliente || !selectedEstadoVenta) {
      toast.error('Debe seleccionar un cliente y un estado de venta');
      return;
    }

    try {
      await api.post('/ventas', {
        ID_cliente: selectedCliente,
        productos: selectedProductos,
        precio_total: precioTotal,
        ID_estado_venta: selectedEstadoVenta,
      });
      toast.success('Venta creada con éxito');
      onClose();
    } catch (error) {
      toast.error('Error al crear la venta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Crear Venta</h2>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <label className="tw-font-semibold">Cliente</label>
        <select
          value={selectedCliente || ''}
          onChange={(e) => setSelectedCliente(Number(e.target.value))}
          className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-white tw-shadow-sm"
        >
          <option value="">Seleccionar Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.ID_cliente} value={cliente.ID_cliente}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <label className="tw-font-semibold">Estado de Venta</label>
        <select
          value={selectedEstadoVenta || ''}
          onChange={(e) => setSelectedEstadoVenta(Number(e.target.value))}
          className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-white tw-shadow-sm"
        >
          <option value="">Seleccionar Estado</option>
          {estadoVentas.map((estado) => (
            <option key={estado.ID_estado_venta} value={estado.ID_estado_venta}>
              {estado.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div className="tw-flex tw
  -flex-col tw-gap-2">
        <label className="tw-font-semibold">Productos</label>
        {selectedProductos.map((prod, index) => (
          <div key={index} className="tw-flex tw-gap-2 tw-items-center tw-mb-2">
            <select
              value={prod.ID_producto}
              onChange={(e) =>
                handleProductoChange(index, 'ID_producto', Number(e.target.value))
              }
              className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-white tw-shadow-sm tw-flex-grow"
            >
              <option value={0}>Seleccionar Producto</option>
              {productos.map((producto) => (
                <option key={producto.ID_producto} value={producto.ID_producto}>
                  {producto.nombre}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={prod.cantidad}
              onChange={(e) =>
                handleProductoChange(index, 'cantidad', Number(e.target.value))
              }
              className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-white tw-shadow-sm tw-w-20"
              placeholder="Cantidad"
            />
            <input
              type="number"
              min="0"
              value={prod.precio}
              onChange={(e) =>
                handleProductoChange(index, 'precio', Number(e.target.value))
              }
              className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-white tw-shadow-sm tw-w-20"
              placeholder="Precio"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProducto}
          className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300 tw-self-start"
        >
          + Añadir Producto
        </button>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <label className="tw-font-semibold">Precio Total</label>
        <input
          type="text"
          value={`$${precioTotal.toFixed(2)}`}
          readOnly
          className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 tw-shadow-sm"
        />
      </div>
      <div className="tw-flex tw-justify-end tw-gap-2">
        <button
          type="button"
          onClick={onClose}
          className="tw-bg-gray-300 tw-text-gray-800 tw-rounded-full tw-px-4 tw-py-2 tw-shadow-md tw-hover:bg-gray-400 tw-transition-all tw-duration-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300"
        >
          Crear Venta
        </button>
      </div>
    </form>
  );
};

export default CreateVenta;
