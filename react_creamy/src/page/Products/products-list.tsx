import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import api from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faPlus, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrash, faPlus, faBoxOpen, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';  
import Modal from 'react-modal';

import { Producto } from '../../types/Producto';
import AddProductos from './products-add';
// import AddCategories from './categories-add';
// import EditCategoria from './categories-edit';


Modal.setAppElement('#root');

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ type: 'add' | 'edit' | 'entry'|'detail'| null; id: number | null }>({ type: null, id: null });
  // const [isModalOpen2, setIsModalOpen2] = useState(false);

  
  const fetchProducto = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };


  const handleModal = (type: 'add' | 'edit'|'entry'|'detail' , id: number | null = null) => {
    setModalConfig({type, id});
    setIsModalOpen(true);
  };

  const handleDelete = useCallback(async(id: number)=>{
    toast.promise(api.delete(`productos/${id}`),
      {
        loading: 'Eliminando producto...',
        success: '¡El producto ha sido eliminada!',
        error: 'Hubo un problema al eliminar el producto.',
      }
    ).then(() => {
      fetchProducto(); // Actualiza la lista después de eliminar
    });
  },[]);

  const handleToggleEstado = useCallback (async(id: number, estadoActual: string) =>{
    const nuevoEstado = estadoActual === 'Disponible' ? 'Agotado' : 'Disponible';

    try {
      await api.put(`/productos/${id}`, { estado_producto: nuevoEstado });
      setProductos(productos.map(pro => pro.ID_producto === id ? { ...pro, estado_producto: nuevoEstado } : pro

      ));
      toast.success('El estado del producto ha sido actualizado.');
    } catch (error) {
      console.error('Error al cambiar el estado del producto:', error);
      toast.error('Hubo un problema al cambiar el estado del producto.');
    }
  },[productos]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setModalConfig({type:null, id:null});
    fetchProducto(); 
  };

  useEffect(() => {
    fetchProducto(); 
  }, []);

  const columns  = useMemo<MRT_ColumnDef<Producto>[]> (
    
    ()  => [
      {
        accessorKey: 'ID_producto',
        header: '#',
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripcion',
      },
      {
        accessorKey: 'estado_producto',
        header: 'Estado',
        Cell: ({ cell, row }) => (
          <div className="tw-flex tw-items-center">
            <span className={`tw-inline-block tw-text-xs tw-font-semibold tw-rounded-full tw-py-1 tw-px-2 ${cell.getValue<string>() === 'Disponible' ? 'tw-bg-green-100 tw-text-green-800' : 'tw-bg-red-100 tw-text-red-800'}`}>
              {cell.getValue<string>() === 'Disponible' ? 'Disponible' : 'Agotado'}
            </span>
            <button
              onClick={() => handleToggleEstado(row.original.ID_producto, cell.getValue<string>())}
              className="tw-ml-2 tw-text-gray-700 tw-transition-colors hover:tw-text-gray-900"
            >
              <FontAwesomeIcon
                icon={cell.getValue<string>() === 'Disponible' ? faToggleOn : faToggleOff}
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
            {/* <button onClick={() => handleModal('edit',row.original.ID_categoria)} className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faEdit} />
            </button> */}
            <button onClick={() => handleDelete(row.original.ID_producto)} className="tw-bg-red-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-red-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="tw-bg-green-500 tw-text-white tw-rounded-full tw-p-2 tw-shadow-md tw-hover:bg-green-600 tw-transition-all tw-duration-300">
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
           
            </div>
        ),
      },
    ], [handleToggleEstado, handleDelete]);

  return (
    <>
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
         
         <h1 className="page-heading">Productos</h1>
         <button onClick={()=>handleModal('add')} className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-px-4 tw-py-2 tw-mb-4 tw-shadow-md tw-hover:bg-blue-600 tw-transition-all tw-duration-300">
           <FontAwesomeIcon icon={faPlus} /> Agregar producto
         </button>
         <MaterialReactTable columns={columns} data={productos} /> 
         <Modal
           isOpen={isModalOpen}
           onRequestClose={handleCloseModal}
            className="tw-bg-white tw-p-0 tw-mb-12 tw-rounded-lg tw-border tw-border-gray-300 tw-w-full tw-max-w-3xl tw-max-h-full tw-overflow-y-auto tw-mx-auto"
  overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-z-50 tw-flex tw-justify-center tw-items-center"
            
         >
            {modalConfig.type === 'add' && <AddProductos onClose={handleCloseModal} />}
           {/* {modalConfig.type === 'add' && <AddCategories onClose={handleCloseModal} />}
           {modalConfig.type === 'edit' && modalConfig.id !== null && <EditCategoria id={modalConfig.id} onClose={handleCloseModal} />} */}
           {/* {modalType === 'entry' && selectedCategoriaId !== null && <AddEntry id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />}
           {modalType === 'detail' && selectedCategoriaId !== null && <InsumoDetails id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />} */}
         </Modal>
       </div>
    </>
  );
};

export default Productos;