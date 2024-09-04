import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';

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
  isOpen: boolean;
}

const CreateVenta: React.FC<CreateVentaProps> = ({ onClose, isOpen }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [estadoVentas, setEstadoVentas] = useState<EstadoVenta[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);
  const [selectedEstadoVenta, setSelectedEstadoVenta] = useState<number | null>(null);
  const [selectedProductos, setSelectedProductos] = useState<
    { ID_producto: number; cantidad: number; precio: number; nombre: string }[]
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
      { ID_producto: 0, cantidad: 1, precio: 0, nombre: '' },
    ]);
  };

  const handleProductoChange = (index: number, field: string, value: number | string) => {
    const updatedProductos = selectedProductos.map((prod, i) => {
      if (i === index) {
        const producto = productos.find((p) => p.ID_producto === Number(value));
        if (field === 'ID_producto' && producto) {
          return { ...prod, ID_producto: producto.ID_producto, precio: producto.precio, nombre: producto.nombre };
        }
        return { ...prod, [field]: value };
      }
      return prod;
    });
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
        productos: selectedProductos.map(({ ID_producto, cantidad, precio }) => ({
          ID_producto,
          cantidad,
          precio,
        })),
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="tw-fixed tw-z-10 tw-inset-0 tw-flex tw-items-center tw-justify-center"
      overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-opacity-50"
      contentLabel="Crear Venta"
      ariaHideApp={false}
    >
      <form onSubmit={handleSubmit} className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-8 tw-w-full tw-max-w-lg tw-mx-auto">
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
        <div className="tw-flex tw-flex-col tw-gap-2">
          <label className="tw-font-semibold">Productos</label>
          {selectedProductos.map((prod, index) => (
            <div key={index} className="tw-flex tw-gap-2 tw-items-center tw-mb-2">
              <select
                value={prod.ID_producto}
                onChange={(e) =>
                  handleProductoChange(index, 'ID_producto', e.target.value)
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
                type="text"
                value={`$${prod.precio.toFixed(2)}`}
                readOnly
                className="tw-border tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 tw-shadow-sm tw-w-20"
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
            className="tw-bg-green-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-shadow-md tw-hover:bg-green-600 tw-transition-all tw-duration-300"
          >
            Guardar Venta
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateVenta;
