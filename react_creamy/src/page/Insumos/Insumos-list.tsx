import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Insumo } from '../../types/insumos';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faBoxOpen, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import AddInsumo from './CreateInsumo';
import EditInsumo from './EditInsumo';
import AddEntry from './AddEntry';
import InsumoDetails from './InsumoDetails';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const InsumosList: React.FC = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'entry' | 'detail' | null>(null);
  const [selectedInsumoId, setSelectedInsumoId] = useState<number | null>(null);

  useEffect(() => {
    fetchInsumos();
  }, []);

  const fetchInsumos = async () => {
    try {
      const response = await api.get('/insumos');
      setInsumos(response.data);
    } catch (error) {
      console.error('Error al obtener los insumos:', error);
    }
  };

  const handleEdit = (id: number) => {
    setSelectedInsumoId(id);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/insumos/${id}`);
        fetchInsumos(); // Actualiza la lista después de eliminar
        Swal.fire('¡Eliminado!', 'El insumo ha sido eliminado.', 'success');
      } catch (error) {
        console.error('Error al eliminar el insumo:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el insumo.', 'error');
      }
    }
  };

  const handleToggleEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'A' ? 'D' : 'A';

    try {
      await api.put(`/insumos/${id}`, { estado_insumo: nuevoEstado });
      setInsumos(insumos.map(insumo =>
        insumo.ID_insumo === id ? { ...insumo, estado_insumo: nuevoEstado } : insumo
      ));
      Swal.fire('¡Éxito!', 'El estado del insumo ha sido actualizado.', 'success');
    } catch (error) {
      console.error('Error al cambiar el estado del insumo:', error);
      Swal.fire('Error', 'Hubo un problema al cambiar el estado del insumo.', 'error');
    }
  };

  const handleAddInsumo = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  const handleAddEntry = (id: number) => {
    setSelectedInsumoId(id);
    setModalType('entry');
    setIsModalOpen(true);
  };
  const handleViewDetails = (id: number) => {
    setSelectedInsumoId(id);
    setModalType('detail');  
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedInsumoId(null);
  };

  const handleModalCloseAndFetch = async () => {
    handleCloseModal();
    await fetchInsumos(); // Actualiza la lista después de agregar/editar entrada
  };

  const columns = useMemo<MRT_ColumnDef<Insumo>[]>(
    () => [
      {
        accessorKey: 'descripcion_insumo',
        header: 'Nombre',
      },
      {
        accessorKey: 'precio',
        header: 'Precio',
        Cell: ({ cell }) => `$${cell.getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: 'estado_insumo',
        header: 'Estado',
        Cell: ({ cell, row }) => (
          <div className="tw-flex tw-items-center">
            <span className={`tw-inline-block tw-text-xs tw-font-semibold tw-rounded-full tw-py-1 tw-px-2 ${cell.getValue<string>() === 'A' ? 'tw-bg-green-100 tw-text-green-800' : 'tw-bg-red-100 tw-text-red-800'}`}>
              {cell.getValue<string>() === 'A' ? 'Activo' : 'Inactivo'}
            </span>
            <button
              onClick={() => handleToggleEstado(row.original.ID_insumo, cell.getValue<string>())}
              className="tw-ml-2 tw-text-gray-700 tw-transition-colors hover:tw-text-gray-900"
            >
              <FontAwesomeIcon
                icon={cell.getValue<string>() === 'A' ? faToggleOn : faToggleOff}
                className="tw-text-2xl"
              />
            </button>
            
          </div>
        ),
      },
      {
        accessorKey: 'stock.stock_actual',
        header: 'Cantidad',
        Cell: ({ cell }) => cell.getValue<number>() ?? 'N/A',
      },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <div className="tw-flex tw-justify-center tw-gap-2">
            <button onClick={() => handleEdit(row.original.ID_insumo)} className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDelete(row.original.ID_insumo)} className="tw-bg-red-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-red-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => handleAddEntry(row.original.ID_insumo)} className="tw-bg-green-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-green-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
            <button onClick={() => handleViewDetails(row.original.ID_insumo)} className="tw-bg-gray-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-gray-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
          </div>
        ),
      },
    ],
    [insumos],
  );

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h2 className="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-gray-800">Lista de Insumos</h2>
      <button onClick={handleAddInsumo} className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-mb-4 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300">
        <FontAwesomeIcon icon={faPlus} /> Agregar Insumo
      </button>
      <MaterialReactTable columns={columns} data={insumos} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full tw-mx-auto tw-transform tw-translate-y-1/4 tw-transition-all tw-duration-300"
        overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-50 tw-flex tw-justify-center tw-items-center"
      >
        {modalType === 'add' && <AddInsumo onClose={handleModalCloseAndFetch} />}
        {modalType === 'edit' && selectedInsumoId !== null && <EditInsumo id={selectedInsumoId} onClose={handleModalCloseAndFetch} />}
        {modalType === 'entry' && selectedInsumoId !== null && <AddEntry id={selectedInsumoId} onClose={handleModalCloseAndFetch} />}
        {modalType === 'detail' && selectedInsumoId !== null && <InsumoDetails id={selectedInsumoId} onClose={handleCloseModal} />}  {/* Renderizar InsumoDetails */}
        <div className="tw-flex tw-justify-end tw-mt-4">
          <button
            onClick={handleCloseModal}
            className="tw-bg-gray-300 tw-text-gray-800 tw-rounded-full tw-px-4 tw-py-2 tw-mr-2 tw-shadow-md tw-hover:bg-gray-400 tw-transition-all tw-duration-300"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default InsumosList;
