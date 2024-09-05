import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Ventas } from '../../types/Ventas'; 
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import AddVenta from './CreateVenta'; // Asegúrate de tener este componente
import VentaDetails from './VentaDetail'; // Asegúrate de tener este componente

Modal.setAppElement('#root');

const VentasList: React.FC = () => {
  const [ventas, setVentas] = useState<Ventas[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'detail' | null>(null);
  const [selectedVentaId, setSelectedVentaId] = useState<number | null>(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await api.get('/ventas');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      toast.error('Error al obtener las ventas');
    }
  };

  const handleAddVenta = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  const handleViewDetails = (id: number) => {
    setSelectedVentaId(id);
    setModalType('detail');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedVentaId(null);
  };

  const columns = useMemo<MRT_ColumnDef<Ventas>[]>(
    () => [
      {
        accessorFn: (row) => (row.Cliente ? row.Cliente.nombre : 'Sin Cliente'),
        id: 'clienteNombre',
        header: 'Cliente',
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha',
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: 'precio_total',
        header: 'Total',
        Cell: ({ cell }) => `$${cell.getValue<number>().toFixed(2)}`,
      },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <div className="tw-flex tw-justify-center">
            <button
              onClick={() => handleViewDetails(row.original.ID_venta)}
              className="tw-bg-gray-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-gray-600 tw-transition-all tw-duration-300"
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>       
          </div>
        ),
      },
    ],
    [ventas],
  );

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h2 className="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-gray-800">Lista de Ventas</h2>
      <button
        onClick={handleAddVenta}
        className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-mb-4 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300"
      >
        <FontAwesomeIcon icon={faPlus} /> Agregar Venta
      </button>
      <MaterialReactTable columns={columns} data={ventas} />
      <Modal
  isOpen={isModalOpen}
  onRequestClose={handleCloseModal}
  className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full tw-mx-auto tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-transition-all tw-duration-300"
  overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-50"
>
  {modalType === 'add' && <AddVenta isOpen={isModalOpen} onClose={handleCloseModal} />}
  {modalType === 'detail' && selectedVentaId !== null && <VentaDetails id={selectedVentaId} onClose={handleCloseModal} />}
  <div className="tw-flex tw-justify-end tw-mt-4">
    <button
      onClick={handleCloseModal}
      className="tw-bg-red-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-shadow-md tw-hover:bg-red-600 tw-transition-all tw-duration-300"
    >
      Cerrar
    </button>
  </div>
</Modal>
    </div>
  );
};

export default VentasList;
