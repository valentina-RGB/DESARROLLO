import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import api from '../../api/api';

// Interfaces
interface Producto {
  ID_producto: number;
  descripcion: string;
  precio_neto: number;
}

interface Cliente {
  ID_cliente: number;
  nombre: string;
}

interface EstadoVenta {
  ID_estado_venta: number;
  descripcion: string;
}

interface Insumo {
  ID_insumo: number;
  descripcion: string;
  tipo_insumo: string;
  precio_neto: number;
}

interface CreateVentaProps {
  onClose: () => void;
  isOpen: boolean;
  onVentaCreated: () => void;
}

// Componente CreateVenta
const CreateVenta: React.FC<CreateVentaProps> = ({ onClose, isOpen, onVentaCreated }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [estadoVentas, setEstadoVentas] = useState<EstadoVenta[]>([]);
  const [sabores, setSabores] = useState<Insumo[]>([]);
  const [salsas, setSalsas] = useState<Insumo[]>([]);
  const [adiciones, setAdiciones] = useState<Insumo[]>([]);

  const [selectedCliente, setSelectedCliente] = useState<number | null>(null);
  const [selectedEstadoVenta, setSelectedEstadoVenta] = useState<number | null>(null);
  const [selectedProductos, setSelectedProductos] = useState<any[]>([]);
  const [precioTotal, setPrecioTotal] = useState<number>(0);

  useEffect(() => {
    fetchClientes();
    fetchProductos();
    fetchInsumos();
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

  const fetchInsumos = async () => {
    try {
      const response = await api.get('/insumos');
      const sabores = response.data.filter((insumo: Insumo) => insumo.tipo_insumo === 'helado');
      const salsas = response.data.filter((insumo: Insumo) => insumo.tipo_insumo === 'salsa');
      const adiciones = response.data.filter((insumo: Insumo) => insumo.tipo_insumo === 'adicion');
      setSabores(sabores);
      setSalsas(salsas);
      setAdiciones(adiciones);
    } catch (error) {
      toast.error('Error al obtener insumos');
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
      { ID_producto: null, cantidad: 1, precio: 0, descripcion: '', selectedSabores: [], selectedSalsas: [], selectedAdiciones: [] },
    ]);
  };

  const handleProductoChange = (index: number, field: string, value: any) => {
    setSelectedProductos((prev) => {
      const updatedProductos = [...prev];
      updatedProductos[index] = {
        ...updatedProductos[index],
        [field]: value,
      };
      return updatedProductos;
    });
  };

  const handleInsumoChange = (index: number, insumoType: string, value: any[]) => {
    setSelectedProductos((prev) => {
      const updatedProductos = [...prev];
      updatedProductos[index] = {
        ...updatedProductos[index],
        [`selected${insumoType.charAt(0).toUpperCase() + insumoType.slice(1)}`]: value,
      };
      return updatedProductos;
    });
  };

  const calculatePrecioTotal = () => {
    const total = selectedProductos.reduce(
      (sum, prod) =>
        sum +
        (prod.cantidad || 0) * (prod.precio || 0) +
        prod.selectedAdiciones.reduce((adicionSum, adicionId) => {
          const adicion = adiciones.find((a) => a.ID_insumo === adicionId);
          return adicionSum + (adicion ? adicion.precio_neto : 0);
        }, 0) +
        prod.selectedSalsas.reduce((salsaSum, salsaId) => {
          const salsa = salsas.find((s) => s.ID_insumo === salsaId);
          return salsaSum + (salsa ? salsa.precio_neto : 0);
        }, 0),
      0,
    );
    setPrecioTotal(total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEstadoVenta) {
      toast.error('Debe seleccionar un estado de venta');
      return;
    }

    try {
      await api.post('/ventas', {
        ID_cliente: selectedCliente || null,
        productos: selectedProductos.map((prod) => ({
          ID_producto: prod.ID_producto,
          cantidad: prod.cantidad,
          precio: prod.precio,
          selectedSabores: prod.selectedSabores,
          selectedSalsas: prod.selectedSalsas,
          selectedAdiciones: prod.selectedAdiciones,
        })),
        precio_total: precioTotal,
        ID_estado_venta: selectedEstadoVenta,
      });
      toast.success('Venta creada con éxito');
      onClose();
      onVentaCreated();
    } catch (error) {
      toast.error('Error al crear la venta');
      console.error('Error al crear la venta:', error);
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-screen-lg tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2"
    overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50"
    contentLabel="Crear Venta"
    ariaHideApp={false} // Cambiado a false si estás manejando la accesibilidad por otros medios
  >
    <div className="tw-p-6 tw-w-full">
      <h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-6">Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
            <div className="tw-flex tw-flex-col">
              <label className="tw-font-semibold">Cliente</label>
              <Select
                value={clientes.find((c) => c.ID_cliente === selectedCliente) || null}
                onChange={(option) => setSelectedCliente(option?.ID_cliente || null)}
                options={clientes.map((cliente) => ({
                  value: cliente.ID_cliente,
                  label: cliente.nombre,
                }))}
                placeholder="Selecciona un cliente"
                isClearable
              />
            </div>

            <div className="tw-flex tw-flex-col">
              <label className="tw-font-semibold">Estado de Venta</label>
              <Select
                value={estadoVentas.find((e) => e.ID_estado_venta === selectedEstadoVenta) || null}
                onChange={(option) => setSelectedEstadoVenta(option?.ID_estado_venta || null)}
                options={estadoVentas.map((estado) => ({
                  value: estado.ID_estado_venta,
                  label: estado.descripcion,
                }))}
                placeholder="Selecciona un estado de venta"
                isClearable
              />
            </div>
          </div>

          <div className="tw-mt-6 tw-border-t tw-border-gray-300 tw-pt-6">
            <h3 className="tw-text-xl tw-font-semibold">Productos</h3>
            {selectedProductos.map((producto, index) => (
              <div key={index} className="tw-mb-6 tw-p-4 tw-bg-gray-100 tw-rounded-lg">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                  <div className="tw-flex tw-flex-col">
                    <label className="tw-font-semibold">Producto</label>
                    <Select
                      value={productos.find((p) => p.ID_producto === producto.ID_producto) || null}
                      onChange={(option) => handleProductoChange(index, 'ID_producto', option?.value || null)}
                      options={productos.map((prod) => ({
                        value: prod.ID_producto,
                        label: prod.descripcion,
                      }))}
                      placeholder="Selecciona un producto"
                      isClearable
                    />
                  </div>

                  <div className="tw-flex tw-flex-col">
                    <label className="tw-font-semibold">Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      value={producto.cantidad}
                      onChange={(e) => handleProductoChange(index, 'cantidad', Number(e.target.value))}
                      className="tw-bg-white tw-border tw-rounded tw-px-2 tw-py-1"
                    />
                  </div>
                </div>

                <div className="tw-mt-4 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
                  <div className="tw-flex tw-flex-col">
                    <label className="tw-font-semibold">Sabores</label>
                    <Select
                      isMulti
                      value={sabores.filter((s) => producto.selectedSabores.includes(s.ID_insumo)).map((s) => ({
                        value: s.ID_insumo,
                        label: s.descripcion,
                      }))}
                      onChange={(options) => handleInsumoChange(index, 'sabores', options.map((o) => o.value))}
                      options={sabores.map((s) => ({
                        value: s.ID_insumo,
                        label: s.descripcion,
                      }))}
                      placeholder="Selecciona sabores"
                      maxMenuHeight={150}
                    />
                  </div>

                  <div className="tw-flex tw-flex-col">
                    <label className="tw-font-semibold">Salsas</label>
                    <Select
                      isMulti
                      value={salsas.filter((s) => producto.selectedSalsas.includes(s.ID_insumo)).map((s) => ({
                        value: s.ID_insumo,
                        label: s.descripcion,
                      }))}
                      onChange={(options) => handleInsumoChange(index, 'salsas', options.map((o) => o.value))}
                      options={salsas.map((s) => ({
                        value: s.ID_insumo,
                        label: s.descripcion,
                      }))}
                      placeholder="Selecciona salsas"
                      maxMenuHeight={150}
                    />
                  </div>

                  <div className="tw-flex tw-flex-col">
                    <label className="tw-font-semibold">Adiciones</label>
                    <Select
                      isMulti
                      value={adiciones.filter((a) => producto.selectedAdiciones.includes(a.ID_insumo)).map((a) => ({
                        value: a.ID_insumo,
                        label: a.descripcion,
                      }))}
                      onChange={(options) => handleInsumoChange(index, 'adiciones', options.map((o) => o.value))}
                      options={adiciones.map((a) => ({
                        value: a.ID_insumo,
                        label: a.descripcion,
                      }))}
                      placeholder="Selecciona adiciones"
                      maxMenuHeight={150}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProductos((prev) => prev.filter((_, prodIndex) => prodIndex !== index))
                  }
                  className="tw-mt-4 tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded"
                >
                  Eliminar producto
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddProducto}
              className="tw-bg-indigo-600 tw-text-white tw-px-4 tw-py-2 tw-rounded"
            >
              Agregar Producto
            </button>
          </div>

          <div className="tw-text-lg tw-font-semibold tw-text-right tw-mt-4">
            Precio Total: ${precioTotal.toFixed(2)}
          </div>

          <div className="tw-flex tw-justify-end tw-gap-4 tw-mt-8">
            <button type="button" onClick={onClose} className="tw-bg-gray-300 tw-px-4 tw-py-2 tw-rounded">
              Cancelar
            </button>
            <button type="submit" className="tw-bg-indigo-600 tw-text-white tw-px-4 tw-py-2 tw-rounded">
              Crear Venta
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateVenta;
