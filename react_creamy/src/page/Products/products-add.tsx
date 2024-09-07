
import React, { useState, ChangeEvent, DragEvent, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { UploadIcon } from 'lucide-react';
import Modal from 'react-modal';
import AddInsumoProductos from "./insumo-add";
import { forElement } from "dropzone";




Modal.setAppElement('#root');

interface AddCategories { 
  onClose: () => void;
}

const AddProductos: React.FC<AddCategories> = ({ onClose }) => {
    const [descripcion, setDescripcion] = useState<string>('');
    const [estado, setEstado] = useState<string>('A');
    const [imagen, setImagen] = useState('');
    const [categorias, setCategorias] = useState<Array<{ ID_categoria: number, descripcion: string }>>([]);
    const [tipo, setTipo] = useState<Array<{ ID_tipo_producto: number, descripcion: string }>>([]);
    const [error, setError] = useState<string | unknown>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ type: 'add'| null; id: number | null }>({ type: null, id: null });
    const navigate = useNavigate();

    
const [errors, setErrors] = useState({
    descripcion: '',
    imagen: ''
  });



  const [formData, setFormData] = useState<{
    nombre: string
    descripcion: string;
    categorias: number|string ;
    estado: string;
    tipo: number|string ;
    image: File | null;
  }>({
    nombre: '',
    descripcion: '',
    categorias: 0,  // Por ejemplo, inicializar como 0
    estado: 'A',
    tipo: 0,
    image: null,
  });


  const fetchCategorias = async () =>{
    try{
        const response = await api.get('/categorias');
        setCategorias(response.data )
    }catch(err:unknown){
        console.error('Error al cargar las categorías :', err);
        setError(err);
    }
  }

  const fetchTipo = async () =>{
    try{
        const response = await api.get('/tipo_producto');
        setTipo(response.data )
    }catch(err:unknown){
        console.error('Error al cargar el  tipo de producto :', err);
        setError(err);
    }
  }
  

  useEffect(() => {
   

      fetchTipo()
      fetchCategorias();
  },[]);



  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);


  const handleModal = (type: 'add' , id: number | null = null) => {
    setModalConfig({type, id});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setModalConfig({type:null, id:null});
    fetchTipo()
    fetchCategorias();
  };

 


 

 // 2. Manejo de cambio en los inputs


 const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement> ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'descripcion') {
      setErrors(prev => ({ ...prev, descripcion: '' }));
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: '' }));
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };



 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
          descripcion: formData.descripcion,
          estado_categoria: formData.estado,
          imagen: formData.image||''
          // imagen: ''
      };

      const newErrors = { descripcion: '', imagen: '' };
      if (!formData.descripcion.trim()) {
            newErrors.descripcion = 'El nombre de la categoría es obligatorio';
      }
    //   if (!formData.imagen) {
    //     newErrors.imagen = 'La imagen es obligatoria';
    //   }
      setErrors(newErrors);
      if (!newErrors.descripcion) {
    try {
          await api.post('/categorias',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
          onClose(); 
        toast.success('La categoría ha agregada exitosamente.');
        navigate('/Categorias');
        resetForm();
        
      } catch (error) {
        toast.error('No se pudo agregar la categoría. Por favor, intente nuevamente.');
        setError(error);
      }}
  };

  const resetForm = () => {
    setDescripcion(descripcion);
    setEstado(estado);
    setImagen(imagen);

    // setError(null);
  };





  return (
    <>
    <div className="tw-bg-[#f8faf] dark:tw-bg-[#f5f3ff] tw-p-6 tw-rounded-lg tw-shadow-lg">
    <div className="tw-mb-4">
      <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
        <h2 className="tw-text-2xl tw-font-bold tw-text-[#6b46c1]">Nuevo Producto</h2>
        <p className="tw-text-gray-500 dark:tw-text-gray-400">
          Completa los siguientes campos para agregar un nuevo producto a tu catálogo.
        </p>
        
      </div>
    </div>
    <div className="tw-mb-6">
      <form onSubmit={handleSubmit}  className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6" >
        {/* Columna de información del producto */}
        <div className="tw-col-span-2 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <div className="tw-grid tw-gap-2">
            <label htmlFor="nombre" className="tw-text-gray-800 dark:tw-text-gray-800">
              Nombre
            </label>
            <input
              id="nombre"
              name= "nombre"
              type="text"
              value= {formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
              className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
            />
          </div>
          <div className="tw-grid tw-gap-2">
            <label htmlFor="price" className="tw-text-gray-800 dark:tw-text-gray-800">
              Precio Neto
            </label>
            <input
              id="price"
              type="number"
              min="1000"
              max= "50000" 
              step="100"
              placeholder="Ingresa el precio"
              className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
            />
          </div>
          <div className="tw-grid tw-gap-2">
            <label htmlFor="categoria" className="tw-text-gray-800 dark:tw-text-gray-800">
              Categoría
            </label>
            <select
              id="categorias"
              name="categorias"
              value={formData.categorias} 
              onChange={handleInputChange}
              className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
            >
              <option value={0} disabled >
                Selecciona un producto
              </option>
              {categorias.map(c => (
                    <option  key ={c.ID_categoria} value={c.ID_categoria}>{c.descripcion}</option>
              ))}
            </select>
          </div>
          <div className="tw-grid tw-gap-2">
            <label htmlFor="type" className="tw-text-gray-600 dark:tw-text-gray-400">
              Tipo de Producto
            </label>
            <select
              id="type"
              name = "tipo"
              value = {formData.tipo}
              onChange={handleInputChange}
              className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
            >
              <option value={0} disabled >
                Selecciona un tipo
              </option>
              {tipo.map(t => (
              <option key = {t.ID_tipo_producto} value= {t.ID_tipo_producto}>{t.descripcion}</option>
              ))};
            </select>
          </div>
          <div className="tw-grid tw-gap-2 tw-col-span-2 md:tw-col-span-2">
            <label htmlFor="descripcion" className="tw-text-gray-600 dark:tw-text-gray-400">
              Descripción
            </label>
            <textarea
              id="descripcion" 
              placeholder="Describe el producto"
              className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-300 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
            />
          </div>
         
        </div>
        {/* Columna de imagen del producto */}
        <div className="tw-space-y-2">
          <label htmlFor="image" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
            Imagen
          </label>
          <div
            className={`tw-border-2 tw-border-dashed tw-rounded-lg tw-p-4 tw-text-center ${
              dragActive ? 'tw-border-indigo-400' : 'tw-border-gray-300'
            } `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              className="tw-hidden"
            />
            {preview ? (
              <div className="tw-relative tw-w-full tw-h-48">
                <img
                  src={preview}
                  alt="Vista previa"
                  className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                />
                <button
                  type="button"
                  className="tw-absolute tw-top-2 tw-right-2 tw-px-2 tw-py-1 tw-bg-white tw-text-gray-700 tw-text-sm tw-rounded tw-shadow"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, image: null }));
                    setPreview(null);
                  }}
                > Cambiar
                </button>
              </div>
            ) : (
              <label htmlFor="image" className="tw-cursor-pointer">
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-8">
                  <UploadIcon className="tw-w-12 tw-h-12 tw-text-gray-400" />
                  <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
                    Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                  </p>
                </div>
              </label>
            )}
          </div>
          <div className="">
          <button onClick={()=>handleModal('add')} className="tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-rounded-md tw-px-4 tw-py-2 focus:tw-ring-[#6b46c1] focus:tw-ring-offset-2">
           Añadir insumos +
        </button>
          </div>
        </div>
      </form>
    </div>
    <div className="tw-mt-4">
      <button className="tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-rounded-md tw-px-4 tw-py-2 focus:tw-ring-[#6b46c1] focus:tw-ring-offset-2">
        Guardar Producto
      </button>
    </div>
  </div>
  <Modal
           isOpen={isModalOpen}
           onRequestClose={handleCloseModal}
            className="tw-bg-white tw-p-0 tw-mb-12 tw-rounded-lg tw-border tw-border-gray-300 tw-w-full tw-max-w-3xl tw-max-h-full tw-overflow-y-auto tw-mx-auto"
  overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-z-50 tw-flex tw-justify-center tw-items-center"
            
         >
            {modalConfig.type === 'add' &&  modalConfig.id !== null &&  <AddInsumoProductos  id={modalConfig.id}   onClose={handleCloseModal} />}
           {/* {modalConfig.type === 'add' && <AddCategories onClose={handleCloseModal} />}
           {modalConfig.type === 'edit' && modalConfig.id !== null && <EditCategoria id={modalConfig.id} onClose={handleCloseModal} />} */}
           {/* {modalType === 'entry' && selectedCategoriaId !== null && <AddEntry id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />}
           {modalType === 'detail' && selectedCategoriaId !== null && <InsumoDetails id={selectedCategoriaId} onClose={handleModalCloseAndFetch} />} */}
         </Modal>
  
  </>
  
  )
}
  



export default AddProductos;
