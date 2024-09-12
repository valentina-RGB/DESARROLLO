import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import api from '../../api/api';

// Interfaces
interface Producto {
  ID_producto: number;
  nombre: string;
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
      console.error('Error al obtener clientes:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      toast.error('Error al obtener los productos');
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchInsumos = async () => {
    try {
      const response = await api.get('/insumos');
      const sabores = response.data.filter((insumo: Insumo) => insumo.tipo_insumo === 'helado') || [];
      const salsas = response.data.filter((insumo: Insumo) => insumo.tipo_insumo === 'salsa') || [];
      const adiciones = response.data.filter((insumo: Insumo) => insumo.tipo_insumo === 'adicion') || [];
      setSabores(sabores);
      setSalsas(salsas);
      setAdiciones(adiciones);
    } catch (error) {
      toast.error('Error al obtener insumos');
      console.error('Error al obtener insumos:', error);
    }
  };

  const fetchEstadoVentas = async () => {
    try {
      const response = await api.get('/estadoVentas');
      setEstadoVentas(response.data);
    } catch (error) {
      toast.error('Error al obtener los estados de venta');
      console.error('Error al obtener estados de venta:', error);
    }
  };

  const handleAddProducto = () => {
    if (selectedProductos.length >= 3) {
      toast.error('No puedes agregar más de 3 productos');
      return;
    }
    setSelectedProductos((prev) => [
      ...prev,
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
      calculatePrecioTotal(); // Asegúrate de recalcular el precio total aquí
      return updatedProductos;
    });
  };

  const handleInsumoChange = (index: number, insumoType: string, value: any[]) => {
    if (value.length > 3) {
      toast.error(`No puedes seleccionar más de 3 ${insumoType}`);
      return;
    }
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
        prod.selectedAdiciones.reduce((adicionSum: number, adicionId: number) => {
          const adicion = adiciones.find((a) => a.ID_insumo === adicionId);
          return adicionSum + (adicion ? adicion.precio_neto : 0);
        }, 0) +
        prod.selectedSalsas.reduce((salsaSum: number, salsaId: number) => {
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
    if (selectedProductos.length === 0) {
      toast.error('Debes agregar al menos un producto');
      return;
    }
    if (selectedProductos.some(p => p.cantidad < 1)) {
      toast.error('La cantidad de cada producto debe ser al menos 1');
      return;
    }
    if (selectedProductos.some(p => p.selectedAdiciones.length > 3)) {
      toast.error('No puedes seleccionar más de 3 adiciones por producto');
      return;
    }
    if (selectedProductos.some(p => p.selectedSalsas.length > 3)) {
      toast.error('No puedes seleccionar más de 3 salsas por producto');
      return;
    }

    try {
      await api.post('/ventas', {
        ID_cliente: selectedCliente,
        productos: selectedProductos,
        precio_total: precioTotal,
        ID_estado_venta: selectedEstadoVenta,
      });
      toast.success('Venta creada exitosamente');
      onVentaCreated();
      onClose();
    } catch (error) {
      toast.error('Error al crear la venta');
      console.error('Error al crear venta:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-screen-lg tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2"
      overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-z-50"
      contentLabel="Crear Venta"
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
                placeholder="Selecciona un estado"
                isClearable
              />
            </div>
          </div>

          <div className="tw-mt-6">
            <label className="tw-font-semibold">Productos</label>
            {selectedProductos.map((producto, index) => (
              <div key={index} className="tw-mt-4 tw-p-4 tw-border tw-rounded-lg tw-shadow-sm">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                  <div className="tw-flex tw-flex-col">
                    <label className="tw-font-semibold">Producto</label>
                    <Select
                      value={productos.find((p) => p.ID_producto === producto.ID_producto) || null}
                      onChange={(option) => handleProductoChange(index, 'ID_producto', option?.ID_producto || null)}
                      options={productos.map((producto) => ({
                        value: producto.ID_producto,
                        label: producto.nombre,
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
                      value={producto.cantidad || ''}
                      onChange={(e) => handleProductoChange(index, 'cantidad', parseInt(e.target.value, 10))}
                      className="tw-border tw-border-gray-300 tw-rounded tw-p-2"
                    />
                  </div>
                </div>

                <div className="tw-mt-4">
                  <label className="tw-font-semibold">Sabores</label>
                  <Select
                    isMulti
                    value={producto.selectedSabores.map((id) => sabores.find((s) => s.ID_insumo === id))}
                    onChange={(values) => handleInsumoChange(index, 'Sabores', values.map((v) => v.value))}
                    options={sabores.map((sabor) => ({
                      value: sabor.ID_insumo,
                      label: sabor.descripcion,
                    }))}
                    placeholder="Selecciona sabores"
                  />
                </div>

                <div className="tw-mt-4">
                  <label className="tw-font-semibold">Salsas</label>
                  <Select
                    isMulti
                    value={producto.selectedSalsas.map((id) => salsas.find((s) => s.ID_insumo === id))}
                    onChange={(values) => handleInsumoChange(index, 'Salsas', values.map((v) => v.value))}
                    options={salsas.map((salsa) => ({
                      value: salsa.ID_insumo,
                      label: salsa.descripcion,
                    }))}
                    placeholder="Selecciona salsas"
                  />
                </div>

                <div className="tw-mt-4">
                  <label className="tw-font-semibold">Adiciones</label>
                  <Select
                    isMulti
                    value={producto.selectedAdiciones.map((id) => adiciones.find((a) => a.ID_insumo === id))}
                    onChange={(values) => handleInsumoChange(index, 'Adiciones', values.map((v) => v.value))}
                    options={adiciones.map((adicion) => ({
                      value: adicion.ID_insumo,
                      label: adicion.descripcion,
                    }))}
                    placeholder="Selecciona adiciones"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProducto}
              className="tw-mt-4 tw-bg-blue-500 tw-text-white tw-p-2 tw-rounded tw-w-full"
            >
              Agregar Producto
            </button>
          </div>

          <div className="tw-mt-6">
            <p className="tw-text-lg tw-font-bold">Precio Total: ${precioTotal.toFixed(2)}</p>
          </div>

          <div className="tw-mt-6">
            <button
              type="submit"
              className="tw-bg-green-500 tw-text-white tw-p-2 tw-rounded tw-w-full"
            >
              Crear Venta
            </button>
            <button
              type="button"
              onClick={onClose}
              className="tw-bg-gray-500 tw-text-white tw-p-2 tw-rounded tw-w-full tw-mt-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateVenta;
