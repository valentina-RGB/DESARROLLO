import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';  
// import AddInsumo from './CreateInsumo';
// import EditInsumo from './EditInsumo';
// import AddEntry from './AddEntry';
// import InsumoDetails from './InsumoDetails';
import Modal from 'react-modal';
import { Categoria } from '../../types/Categoria';
import AddCategories from './categories-add';
import EditCategoria from './categories-edit';


Modal.setAppElement('#root');

const Categories: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'entry' | 'detail' | null>(null);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(null);

  // useEffect(() => {
  //   fetchCategorias();
  // }, []);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };


  const handleEdit = (id: number) => {
    setSelectedCategoriaId(id);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    toast.promise(
      api.delete(`categorias/${id}`),
      {
        loading: 'Eliminando categoría...',
        success: '¡La categorpia ha sido eliminada!',
        error: 'Hubo un problema al eliminar la categoría.',
      }
    ).then(() => {
      fetchCategorias(); // Actualiza la lista después de eliminar
    });
  };

  const handleToggleEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'A' ? 'D' : 'A';

    try {
      await api.put(`/categorias/${id}`, { estado_categoria: nuevoEstado });
      setCategorias(categorias.map(categorias =>
        categorias.ID_categoria === id ? { ...categorias, estado_categoria: nuevoEstado } : categorias
        
      ));
      toast.success('El estado de la categoría ha sido actualizado.');
    } catch (error) {
      console.error('Error al cambiar el estado de la categoría:', error);
      toast.error('Hubo un problema al cambiar el estado de la categoría.');
    }
  };

  const handleAddCategoria= () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  // const handleAddEntry = (id: number) => {
  //   setSelectedCategoriaId(id);
  //   setModalType('entry');
  //   setIsModalOpen(true);
  // };

  // const handleViewDetails = (id: number) => {
  //   setSelectedCategoriaId(id);
  //   setModalType('detail');
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedCategoriaId(null);
  };

  const handleModalCloseAndFetch = async () => {
    handleCloseModal();
    await fetchCategorias(); // Actualiza la lista después de agregar/editar entrada
  };

  useEffect(() => {
    fetchCategorias(); // Carga las categorías cuando el componente se monta
  }, []);

  const columns = useMemo<MRT_ColumnDef<Categoria>[]>(
    () => [
      {
        accessorKey: 'ID_categoria',
        header: '#',
      },
      {
        accessorKey: 'descripcion',
        header: 'Nombre',
      },
      {
        accessorKey: 'estado_categoria',
        header: 'Estado',
        Cell: ({ cell, row }) => (
          <div className="tw-flex tw-items-center">
            <span className={`tw-inline-block tw-text-xs tw-font-semibold tw-rounded-full tw-py-1 tw-px-2 ${cell.getValue<string>() === 'A' ? 'tw-bg-green-100 tw-text-green-800' : 'tw-bg-red-100 tw-text-red-800'}`}>
              {cell.getValue<string>() === 'A' ? 'Activo' : 'Inactivo'}
            </span>
            <button
              onClick={() => handleToggleEstado(row.original.ID_categoria, cell.getValue<string>())}
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
        accessorKey: 'imagen',
        header: 'Imagen',
        Cell: ({ cell }) => cell.getValue<string>() ?? 'N/A',
      },
      {
        id: 'acciones',
        header: 'Acciones',
        Cell: ({ row }) => (
          <div className="tw-flex tw-justify-center tw-gap-2">
            {/* <button onClick={() => handleEdit(row.original.ID_categoria)} className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDelete(row.original.ID_categoria)} className="tw-bg-red-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-red-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => handleAddEntry(row.original.ID_categoria)} className="tw-bg-green-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-green-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
            <button
              onClick={() => handleViewDetails(row.original.ID_categoria)}
              className="tw-bg-gray-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-gray-600 tw-transition-all tw-duration-300"
            >
              <FontAwesomeIcon icon={faSignInAlt} />
            </button> */}
            <button onClick={() => handleDelete(row.original.ID_categoria)} type="button" className="btn btn-outline-danger btn-sm">
            <FontAwesomeIcon icon={faTrash} />
            </button>
  <button onClick={() => handleEdit(row.original.ID_categoria)}  type="button" className="btn btn-outline-info btn-sm " >
  <FontAwesomeIcon icon={faEdit} />
  </button>
  <button type="button" className="btn btn-outline-primary btn-sm"><FontAwesomeIcon icon={faSignInAlt} /></button>
          </div>
        ),
      },
    ],
    [categorias],
  );

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h1 className="page-heading">Categorías</h1>
      <button onClick={handleAddCategoria} className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-mb-4 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300">
        <FontAwesomeIcon icon={faPlus} /> Agregar categoría
      </button>
      <MaterialReactTable columns={columns} data={categorias} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="tw-bg-white tw-p-0 tw-mb-12 tw-rounded-lg tw-border tw-border-gray-300 tw-max-w-lg tw-w-full tw-mx-auto"
        overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-z-50 tw-flex tw-justify-center tw-items-center"
      >
        {modalType === 'add' && <AddCategories onClose={handleModalCloseAndFetch} />}
        {/* {modalType === 'edit' && selectedCategoriaId !== null && <EditCategoria id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />} */}
        {/* {modalType === 'entry' && selectedCategoriaId !== null && <AddEntry id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />}
        {modalType === 'detail' && selectedCategoriaId !== null && <InsumoDetails id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />} */}
      </Modal>
    </div>
  );
};

export default Categories;