import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Ventas } from '../../types/Ventas';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faInfoCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import AddVenta from './CreateVenta';
import VentaDetails from './VentaDetail';

export interface EstadoVenta {
  ID_estado_venta: number;
  descripcion: 'Pagado' | 'Cancelado'; // Ajusta según los estados que manejas
}

Modal.setAppElement('#root');

const VentasList: React.FC = () => {
  const [ventas, setVentas] = useState<Ventas[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'detail' | null>(null);
  const [selectedVentaId, setSelectedVentaId] = useState<number | null>(null);
  const [estadosVenta, setEstadosVenta] = useState<EstadoVenta[]>([]);

  const fetchVentas = async () => {
    try {
      const response = await api.get('/ventas');
      setVentas(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.error('Error al obtener las ventas:', error.message);
      } else {
        console.error('Error desconocido al obtener las ventas');
      }
    }
  };
  
  const fetchEstadosVenta = async () => {
    try {
      const response = await api.get('/estadoventas');
      setEstadosVenta(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error al obtener los estados de ventas:', error.message);
      } else {
        console.error('Error desconocido al obtener los estados de ventas');
      }
    }
  };

  const handleModal = (type: 'add' | 'detail', id: number | null = null) => {
    setModalType(type);
    setSelectedVentaId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedVentaId(null);
    fetchVentas();
  };

  const handleToggleEstado = useCallback(async (id: number, estadoActual: number) => {
    const indexActual = estadosVenta.findIndex((estado) => estado.ID_estado_venta === estadoActual);
    if (indexActual === -1) return;

    const siguienteEstado = estadosVenta[(indexActual + 1) % estadosVenta.length];
    const estadoActualDescripcion = estadosVenta.find((e) => e.ID_estado_venta === estadoActual)?.descripcion;

    if (estadoActualDescripcion === 'Cancelado') {
      toast.error('No se puede revertir el estado de una venta cancelada.');
      return;
    }

    if (siguienteEstado.descripcion === 'Cancelado') {
      const toastId = toast(
        <div>
          <p>¿Estás seguro de que quieres cancelar la venta?</p>
          <div>
            <button
              className="tw-bg-red-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-mr-2"
              onClick={async () => {
                toast.dismiss(toastId);
                try {
  await api.put(`/ventas/${id}/estado`, { ID_estado_venta: siguienteEstado.ID_estado_venta });
  setVentas(ventas.map((venta) =>
    venta.ID_venta === id ? { ...venta, ID_estado_venta: siguienteEstado.ID_estado_venta } : venta
  ));
  toast.success('El estado de la venta ha sido actualizado.');
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error al cambiar el estado de la venta:', error.message);
    toast.error(`Hubo un problema al cambiar el estado de la venta: ${error.message}`);
  } else {
    console.error('Error desconocido al cambiar el estado de la venta');
    toast.error('Hubo un problema desconocido al cambiar el estado de la venta');
  }
}
              }}
            >
              Confirmar
            </button>
            <button
              className="tw-bg-gray-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2"
              onClick={() => toast.dismiss(toastId)}
            >
              Cancelar
            </button>
          </div>
        </div>,
        { duration: 8000 }
      );
      return;
    }

    try {
      console.log(`Actualizando estado de venta ${id} a ${siguienteEstado.ID_estado_venta}`);
      await api.put(`/ventas/${id}/estado`, { ID_estado_venta: siguienteEstado.ID_estado_venta });
      setVentas(ventas.map((venta) =>
        venta.ID_venta === id ? { ...venta, ID_estado_venta: siguienteEstado.ID_estado_venta } : venta
      ));
      toast.success('El estado de la venta ha sido actualizado.');
    } catch (error) {
      console.error('Error al cambiar el estado de la venta:', error);
      toast.error(`Hubo un problema al cambiar el estado de la venta: ${error.response?.data?.message || error.message}`);
    }
  }, [ventas, estadosVenta]);

  useEffect(() => {
    fetchVentas();
    fetchEstadosVenta();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Ventas>[]>(
    () => [
      {
        accessorKey: 'ID_venta',
        header: '#',
      },
      {
        accessorKey: 'ID_cliente',
        header: 'Cliente',
        Cell: ({ cell }) => {
          const cliente = ventas.find((venta) => venta.ID_venta === cell.row.original.ID_venta)?.Cliente;
          return cliente ? cliente.nombre : 'Desconocido';
        },
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
      },
      {
        accessorKey: 'ID_estado_venta',
        header: 'Estado',
        Cell: ({ cell, row }) => {
          const estado = estadosVenta.find((e) => e.ID_estado_venta === cell.getValue<number>());
          const nombreEstado = estado ? estado.descripcion : 'Desconocido';
          const color = estado
            ? {
                'Pagado': 'tw-bg-green-100 tw-text-green-800',
                'Cancelado': 'tw-bg-red-100 tw-text-red-800',
              }[estado.descripcion]
            : 'tw-bg-gray-100 tw-text-gray-800';

          return (
            <div className="tw-flex tw-items-center">
              <span className={`tw-inline-block tw-text-xs tw-font-semibold tw-rounded-full tw-py-1 tw-px-2 ${color}`}>
                {nombreEstado}
              </span>
              <button
                onClick={() => handleToggleEstado(row.original.ID_venta, cell.getValue<number>())}
                className="tw-ml-2 tw-text-gray-700 tw-transition-colors hover:tw-text-gray-900"
              >
                <FontAwesomeIcon icon={faSyncAlt} className="tw-text-2xl" />
              </button>
            </div>
          );
        },
      },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <div className="tw-flex tw-justify-center tw-gap-2">
            <button
              onClick={() => handleModal('detail', row.original.ID_venta)}
              className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
        ),
      },
    ],
    [handleToggleEstado, estadosVenta, ventas]
  );

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h1 className="page-heading">Ventas</h1>
      <button
        onClick={() => handleModal('add')}
        className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-mb-4 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300"
      >
        <FontAwesomeIcon icon={faPlus} /> Agregar una venta
      </button>
      <MaterialReactTable columns={columns} data={ventas} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="tw-bg-white tw-p-0 tw-mb-12 tw-rounded-lg tw-border tw-border-gray-300 tw-max-w-lg tw-w-full tw-mx-auto"
        overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-z-50 tw-flex tw-justify-center tw-items-center"
      >
        {modalType === 'add' && <AddVenta isOpen={isModalOpen} onClose={handleCloseModal} onVentaCreated={handleCloseModal} />}
        {modalType === 'detail' && selectedVentaId !== null && <VentaDetails id={selectedVentaId} onClose={handleCloseModal} />}
      </Modal>
    </div>
  );
};

export default VentasList;
